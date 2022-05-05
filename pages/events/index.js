import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, total, page }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events yet</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} PER_PAGE={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start =
    // +"page" converts it to a number
    +page === 1
      ? // the beggining of the events
        0
      : // calculate the start (current page)
        (+page - 1) * PER_PAGE;
  // Fetch Number Of Events
  const totalRes = await fetch(
    `${API_URL}/api/events?pagination[withCount]=true`
  );
  const totalData = await totalRes.json();
  const total = totalData.meta.pagination.total;
  console.log({ total });

  // Fetch events
  const eventRes = await fetch(
    // http://localhost:1337/api/events?pagination[page]=1&pagination[pageSize]=2
    // `${API_URL}/api/events?populate=*&_sort=date:ASC&?filters[_limit][$eq]=${PER_PAGE}`
    `${API_URL}/api/events?pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&populate=*`
  );
  const eventsData = await eventRes.json();
  const events = eventsData.data;

  return {
    props: { events, page: +page, total },
  };
}
