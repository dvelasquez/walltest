import React, { PropsWithChildren, createContext, useState } from "react";
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
        <header className={style.header}>
          <img
            className={style.header__logo}
            src="/images/logos/logo-wallapop-home-v2.svg"
          />
          <input
            className={style.header__searchbar}
            type="text"
            value={search}
            onChange={handleSearchChange}
          />
        </header>
        <main className={style.main}> {children} </main>
      </div>
    </SearchContext.Provider>
  );
};

export default LayoutComponent;
