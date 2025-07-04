import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps): JSX.Element {
  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description ?? "Image"} />
    </div>
  );
}
