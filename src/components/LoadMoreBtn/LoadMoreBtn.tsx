import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleMore: () => void;
}

export default function LoadMoreBtn({
  handleMore,
}: LoadMoreBtnProps): JSX.Element {
  return (
    <div className={css.loadMoreWrapper}>
      <button onClick={handleMore} className={css.loadMoreBtn}>
        Завантажити ще
      </button>
    </div>
  );
}
