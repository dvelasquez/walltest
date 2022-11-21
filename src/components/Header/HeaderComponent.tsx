import React from "react";
import SearchBar, { SearchComponentProps } from "../SearchBar/SearchBar";
import style from "./HeaderComponent.module.scss";

const HeaderComponent: React.FC<SearchComponentProps> = ({
  handleSearchChange,
  search,
}) => {
  return (
    <header className={style.header} data-testid="header-component">
      <img
        className={style.header__logo}
        src="/images/logos/logo-wallapop-home-v2.svg"
        data-testid="header-logo"
        alt="Wallapop logo"
      />
      <SearchBar search={search} handleSearchChange={handleSearchChange} />
    </header>
  );
};

export default HeaderComponent;
