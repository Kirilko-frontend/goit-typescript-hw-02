import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader(): JSX.Element {
  return (
    <div className={styles.loader}>
      <ClipLoader color="#36d7b7" size={40} />
    </div>
  );
}
