import Head from "next/head";
import React from "react";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userId, setUserId] = useState("default");

  async function onSubmitPost(event) {
    event.preventDefault();
    const response = await fetch("/api/db/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await response.json();
    console.log(data)
  }

  async function onSubmitGet(event) {
    event.preventDefault();
    const response = await fetch("/api/db/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await response.json();
    console.log(data)
  }


  return (<div>
    <Head>
      <title>CKBK - AI Recipe Generator</title>
      <link rel="icon" href="/chef.png" />
    </Head>

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
