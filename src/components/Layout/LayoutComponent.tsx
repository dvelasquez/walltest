import React, { PropsWithChildren, createContext, useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import style from "./LayoutComponent.module.scss";

export const SearchContext = createContext<string>("");

const LayoutComponent: React.FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };
  return (
    <SearchContext.Provider value={search}>
      <div className={style.container}>
        <HeaderComponent
          handleSearchChange={handleSearchChange}
          search={search}
        />
        <main className={style.main}> {children} </main>
      </div>
    </SearchContext.Provider>
  );
};

export default LayoutComponent;
