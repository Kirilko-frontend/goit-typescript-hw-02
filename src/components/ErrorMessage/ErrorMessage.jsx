import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ text }) {
  return <p className={css.error}>{text}</p>;
}
