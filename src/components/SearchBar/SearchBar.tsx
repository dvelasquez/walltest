import React from "react";
import styles from "./SearchBar.module.scss";

export interface SearchComponentProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  testId?: string;
}

const SearchBar = ({
  search,
  handleSearchChange,
  testId,
}: SearchComponentProps) => {
  return (
    <input
      className={styles.searchbar}
      type="text"
      value={search}
      onChange={handleSearchChange}
      data-testid={`searchbar${testId ? "-" + testId : ""}`}
      placeholder="Ingresa tu búsqueda"
    />
  );
};

export default SearchBar;
