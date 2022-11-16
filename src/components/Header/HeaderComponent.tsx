import React from "react";
import style from "./HeaderComponent.module.scss";

export interface HeaderComponentProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
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
      <input
        className={style.header__searchbar}
        type="text"
        value={search}
        onChange={handleSearchChange}
        data-testid="header-searchbar"
      />
    </header>
  );
};

export default HeaderComponent;
