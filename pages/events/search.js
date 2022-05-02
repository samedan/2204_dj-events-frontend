import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();

  // console.log(events);
  return (
    <Layout title="Search results">
      <Link href="/events">Go back</Link>
      <h1>
        Search results for <i>{router.query.term}</i>:
      </h1>
      {events.length === 0 && <h3>No events yet</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  // 'qs' creates
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            description: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encode: false,
    }
  );
  console.log({ query });
  // const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
  const res = await fetch(
    // `${API_URL}/api/events?filters[name][$contains]=${query}&populate=*`
    // /api/books?filters[$or][0][date][$eq]=2020-01-01&filters[$or][1][date][$eq]=2020-01-02&filters[author][name][$eq]=Kai%20doe
    `${API_URL}/api/events?${query}&populate=*`
  );
  const eventsData = await res.json();
  const events = eventsData.data;

  return {
    props: { events },
  };
}
