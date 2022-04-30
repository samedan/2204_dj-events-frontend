import React from "react";
import Link from "next/link";
import Image from "next/Image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  const { attributes } = evt;
  // console.log(attributes);
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            attributes.image
              ? attributes.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width="170"
          height="100"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(attributes.date).toLocaleDateString("en-US")} @{" "}
          {attributes.time}
        </span>
        <h3>{attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${attributes.slug}`}>
          <a className={"btn"}>Details</a>
        </Link>
      </div>
    </div>
  );
}
