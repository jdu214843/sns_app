import React from "react";

const Container = ({ children }) => {
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    color: "black",
    backgroundColor: "white",
  };

  return <div style={containerStyle}>{children}</div>;
};

export default Container;
