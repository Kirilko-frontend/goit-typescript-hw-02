import css from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          className={css.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Пошук зображень..."
        />
        <button type="submit" className={css.button}>
          Пошук
        </button>
      </form>
    </header>
  );
}
