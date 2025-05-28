import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ handleMore }) {
  return (
    <div className={css.loadMoreWrapper}>
      <button onClick={handleMore} className={css.loadMoreBtn}>
        Завантажити ще
      </button>
    </div>
  );
}
