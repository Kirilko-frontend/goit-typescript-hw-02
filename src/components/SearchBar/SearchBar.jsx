import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // імпортуємо toast
import "react-toastify/dist/ReactToastify.css"; // стилі для toast
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Якщо поле вводу порожнє, показуємо повідомлення про помилку
    if (input.trim() === "") {
      toast.error("Поле не може бути порожнім!");
      return;
    }

    // Якщо ввід коректний, викликаємо onSubmit з введеним значенням
    onSubmit(input.trim());
    setInput(""); // очищаємо поле вводу
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

      {/* Додаємо ToastContainer для відображення повідомлень */}
      <ToastContainer />
    </header>
  );
}
