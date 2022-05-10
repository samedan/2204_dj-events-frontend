import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  console.log(req.body);
  if (req.method === "POST") {
    // const {username, email, password} = req.body;
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
    });

    const data = await strapiRes.json();
    console.log({ data });
    // res.json(data);
    if (data.data !== null) {
      //set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
      console.log(data.jwt);
    } else {
      res
        .status(data.error.status)
        // .json({ message: data.message[0].messages[0].message });
        .json({ error: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
