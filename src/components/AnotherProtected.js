import React from "react";
import { Redirect } from "react-router-dom";
function AnotherProtected(props) {
  const { component: RouteComponent, ...rest } = props;
  console.log("props.location", props);
  const login = JSON.parse(localStorage.getItem("login"));
  if (login && login.status === "success" && login.user) {
    return <RouteComponent {...rest} user={login.user} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location },
      }}
    />
  );
}

export default AnotherProtected;
