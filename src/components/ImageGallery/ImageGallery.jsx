import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.item}>
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className={css.image}
            onClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
}
