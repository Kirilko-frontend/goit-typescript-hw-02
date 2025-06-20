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

const ACCESS_KEY = "9ZAe8mtCzOyk5YynjrK9cTRc6xqkLy9LHabkOIt9C8I";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (newQuery) => {
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
        const response = await axios.get(
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

  const handleLoadMore = () => {
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
