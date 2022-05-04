import React from "react";
import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure you want to delete the event?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  console.log(evt);
  if (evt !== undefined) {
    const { attributes } = evt;
    console.log(attributes);
    return (
      <Layout>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a>
                <FaPencilAlt />
                Edit event
              </a>
            </Link>
            <a className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
          <span>
            {new Date(attributes.date).toLocaleDateString("en-US")} at{" "}
            {attributes.time}
          </span>
          <h1>{attributes.name}</h1>
          <ToastContainer />
          {attributes.image.data ? (
            <div className={styles.image}>
              <Image
                src={attributes.image.data.attributes.formats.small.url}
                width={960}
                height={600}
              />
            </div>
          ) : (
            <div className={styles.image}>
              <Image src="/images/event-default.png" width="170" height="100" />
            </div>
          )}
          <h3>Performers: </h3>
          <p>{attributes.performers}</p>
          <h3>Description: </h3>
          <p>{attributes.description}</p>
          <h3>Venue: {attributes.venue}</h3>
          <p>{attributes.address}</p>

          <Link href="/events">
            <a className={styles.back}>{"<"} Go back</a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const eventsData = await res.json();
  const events = eventsData.data;
  const paths = events.map((evt) => ({
    params: { slug: `${evt.slug}` },
  }));
  return {
    paths,
    fallback: true, // false points to 404
  };
}

export async function getStaticProps(
  // params coming from getStaticPaths
  { params: { slug } }
) {
  // const res = await fetch(`${API_URL}/api/events/${slug}`);
  const res = await fetch(
    `${API_URL}/api/events?filters[slug]slug=${slug}&populate=*`
  );
  const eventsData = await res.json();
  const events = await eventsData.data;
  return {
    props: { evt: events[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: { evt: events[0] },
//   };
// }
