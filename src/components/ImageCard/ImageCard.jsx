const ImageCard = ({ image, openModal }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.description}
        onClick={() => openModal(image)}
        style={{ width: "20vw", height: "35vh" }}
      />
    </div>
  );
};

export default ImageCard;
