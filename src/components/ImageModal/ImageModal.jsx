import Modal from "react-modal";
const ImageModal = ({ modalIsOpen, closeModal, image }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "70vw",
          height: "70vh",
          border: "none",
          inset: "0px",
          padding: "0px",
          background: "black",
        },
      }}
    >
      <img
        src={image.urls.full}
        alt={image.description}
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      />
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};
export default ImageModal;
