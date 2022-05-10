import React from "react";
import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "./../../config/index";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id);
  };

  console.log(events);
  return (
    <Layout title="Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: { events },
  };
}
