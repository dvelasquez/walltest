import React from "react";
import styles from "./SearchBar.module.scss";

export interface SearchComponentProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const SearchBar = ({ search, handleSearchChange }: SearchComponentProps) => {
  return (
    <input
      className={styles.searchbar}
      type="text"
      value={search}
      onChange={handleSearchChange}
      data-testid="header-searchbar"
    />
  );
};

export default SearchBar;
