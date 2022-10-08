import React from "react";
import { useEffect } from "react";
import Landing from "../../components/Landing/Landing";

const Home = () => {
  
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <>
      <Landing />
    </>
  );
};

export default Home;
