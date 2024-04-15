import ImageCard from "../ImageCard/ImageCard";
const ImageGallery = ({ images, modalIsOpen, openModal, closeModal }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        gap: "15px",
        paddingTop: "50px",
      }}
    >
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            image={image}
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
