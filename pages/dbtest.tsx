import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

function Home() {
  const [userId, setUserId] = useState("default");

  async function onSubmitPost(event) {
    event.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function onSubmitGet(event) {
    event.preventDefault();
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <main className={styles.main}>
        <img src="/chef.png" className={styles.icon} />
        <h3>Create a User</h3>
        <form onSubmit={onSubmitPost}>
          <input
            type="text"
            name="userId"
            placeholder="default"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input type="submit" value="create user" />
        </form>

        <h3> User</h3>
        <form onSubmit={onSubmitGet}>
          <input type="submit" value="create user" />
        </form>
      </main>
    </div>
  );
}

export default withPageAuthRequired(Home);
