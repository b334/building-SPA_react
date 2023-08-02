import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";

export default function EventItem({ event }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        {token && (
          <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete</button>
          </menu>
        )}
      </menu>
    </article>
  );
}
