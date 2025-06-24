import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import axios from "axios";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Image } from "../../types";

const ACCESS_KEY = "9ZAe8mtCzOyk5YynjrK9cTRc6xqkLy9LHabkOIt9C8I";

interface UnsplashResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleSearch = (newQuery: string): void => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get<UnsplashResponse>(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: query,
              page: page,
              per_page: 12,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        const fetchedImages = response.data.results;

        if (fetchedImages.length === 0 && page === 1) {
          toast.error("Нічого не знайдено за цим запитом.");
        }

        setImages((prevImages) =>
          page === 1 ? fetchedImages : [...prevImages, ...fetchedImages]
        );
      } catch (error) {
        toast.error("Щось пішло не так...");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage text="Сталася помилка. Спробуй ще раз." />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={setSelectedImage} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn handleMore={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
