import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ evt, id }) {
  // console.log({ evt });
  // console.log(evt.image.data.attributes.formats.small.url);
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.image.data ? evt.image.data.attributes.formats.small.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const imageUploaded = async () => {
    const res = await fetch(
      `${API_URL}/api/events?filters[id]id=${id}&populate=*`
    );
    const data = await res.json();
    // latest image on Strapi
    console.log("latest image on Strapi", data);
    setImagePreview(
      data.data[0].attributes.image.data.attributes.formats.small.url
    );
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    // 'Object.values' Returns an array of values of the enumerable properties of an object
    // 'some' Determines whether the specified callback function returns true for any element of an array.
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill all fields!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(values),
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
      console.log(evt);
      if (evt.data.attributes.slug !== "") {
        await router.push(`/events/${evt.data.attributes.slug}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Add new event">
      <Link href="/events">Go back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Edit Event</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event image:</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded yet</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set image
        </button>
      </div>
      {/* MODAL */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evtData = await res.json();
  const evt = evtData.data.attributes;

  return {
    props: { evt, id },
  };
}
