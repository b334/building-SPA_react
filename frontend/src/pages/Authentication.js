import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  // backend returned status 422 for validation error and 401 for login with invalid credentials
  if (response.status === 422 || request.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }
  const responseData = await response.json();
  const token = responseData.token;
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  return redirect("/");
}
