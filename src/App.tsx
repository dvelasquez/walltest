import React from "react";
import LayoutComponent from "./components/Layout/LayoutComponent";
import ManagerPage from "./pages/Manager/Manager";

const App = () => {
  return (
    <>
      <LayoutComponent>
        <ManagerPage />
      </LayoutComponent>
    </>
  );
};

export default App;
