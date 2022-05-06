import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Pagination({ page, total, PER_PAGE }) {
  const data = PER_PAGE;
  const lastPage = Math.ceil(total / PER_PAGE);
  const [currentPerPage, setCurrentPerPage] = useState(PER_PAGE);
  const [currentLastPage, setCurrentLastPage] = useState(lastPage);

  useEffect(() => {
    setCurrentPerPage(currentPerPage);
    const currentCalculatedLastPage = Math.ceil(total / currentPerPage);
    console.log("currentLastPage");
    console.log(currentCalculatedLastPage);
    setCurrentLastPage(currentCalculatedLastPage);
  }, [currentPerPage, data]);

  const handleChange = (e) => {
    e.preventDefault();
    const data = e.target.value;
    console.log("e.target.value");
    console.log(e.target.value);
    setCurrentPerPage(data);
    console.log({ currentPerPage });
    console.log({ data });
  };

  return (
    <>
      {/* Button to Previous Page */}
      {page < currentLastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary" style={{ float: "right" }}>
            Next
          </a>
        </Link>
      )}
      {/* Button to Next Page */}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      <p>{PER_PAGE}</p>
      <form>
        <select value={currentPerPage} onChange={handleChange}>
          <option name="2" value={2}>
            2
          </option>
          <option name="3" value={3}>
            3
          </option>
          <option name="4" value={4}>
            4
          </option>
          <option name="5" value={5}>
            5
          </option>
          <option name="10" value={10}>
            10
          </option>
        </select>
      </form>
    </>
  );
}
