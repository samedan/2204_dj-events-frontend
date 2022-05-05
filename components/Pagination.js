import Link from "next/link";
import React from "react";

export default function Pagination({ page, total, PER_PAGE }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {/* Button to Previous Page */}
      {page < lastPage && (
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
    </>
  );
}
