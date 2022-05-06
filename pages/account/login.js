import React from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  // if (error) {
  //   console.log({ error });
  //   toast.error({ error });
  // } else {
  //   console.log("no error");
  // }

  useEffect(() => {
    if (error) {
      console.log("error", error);
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log in
        </h1>
        {error && <p>{error}</p>}
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn" />

          <p>
            Don't have an account?{" "}
            <Link href="/account/register">Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
