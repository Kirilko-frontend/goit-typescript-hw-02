import css from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.item}>
          <img
            src={image.urls.small}
            alt={image.alt_description ?? "Image"}
            className={css.image}
            onClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
}
