import React from "react";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <main className={props.classname}>{props.children}</main>
    </>
  );
};

export default MainLayout;
