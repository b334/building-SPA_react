import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

export default function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (!token === "EXPIRED") {
      submit.action(null, { action: "/logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit.action(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
