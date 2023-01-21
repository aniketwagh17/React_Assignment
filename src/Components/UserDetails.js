import "./Styles/UserDetails.css";
import Loading from "./Loading.js";
import UserDetailsList from "./UserDetailsList.js";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { createContext } from "react";

export const userContext = createContext(null);

const UserDetails = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUserData(res.data);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <>
      <div className="row row-cols-1 row-cols-lg-4  row-cols-md-3  row-cols-sm-2 g-4">
        <userContext.Provider value={userData}>
          {loading ? <UserDetailsList /> : <Loading />}
        </userContext.Provider>
      </div>
    </>
  );
};

export default UserDetails;
