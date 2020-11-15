import React, { useEffect, useState } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  console.log(status);
  const profileObj = "";

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((res) => setCurrentUser(res.profile), setStatus("idle"));
  }, []);

  console.log(currentUser);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
