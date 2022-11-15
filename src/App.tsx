import React from "react";
import ManagerPage from "./pages/Manager/Manager";

const App = () => {
  return (
    <>
      <h1>My React and TypeScript App!!{new Date().toLocaleDateString()}</h1>
      <ManagerPage />
    </>
  );
};

export default App;
