import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const register = async (user) => {
    console.log(user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    // Strapi uses 'identifier' as an user/email
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "json/application",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();
    console.log("data in authcontext", data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.error);
      // setError(null);
    }
  };

  // Logout
  const logout = async () => {
    console.log("logout");
  };

  // Check if User is Logged in
  const checkUserLoggedIn = async () => {
    console.log("check");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
