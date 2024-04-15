import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import axios from "axios";
import LoadingLSpinner from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal/ImageModal";
import Modal from "react-modal";
const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=GlsOaQzd2KBOSQCF-_6LiDT3UFMeZCJo042ItLtEPKo`
        );
        if (response.data.results.length === 0)
          toast("There are no images found to your request");
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setError(null);
  };

  const handleLoadMoreClick = () => {
    if (!query) {
      toast.error("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      {isLoading && (
        <LoadingLSpinner
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMoreClick} />
      )}
      {modalIsOpen && selectedImage && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
