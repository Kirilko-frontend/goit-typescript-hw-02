import { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      toast.error("Поле не може бути порожнім!");
      return;
    }

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

      <ToastContainer />
    </header>
  );
}
