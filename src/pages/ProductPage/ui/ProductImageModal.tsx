import { ArrowCircleLeft, ArrowCircleRight, CloseOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";

function ProductImageModal({
  images,
  currentImageIndex,
  onClose,
}: {
  images: {
    url: string;
  }[];
  currentImageIndex: number;
  onClose: () => void;
}) {
  const [currentImageIndexModal, setCurrentImageIndexModal] = useState(currentImageIndex);

  const handlePrevClick = () => {
    setCurrentImageIndexModal(
      currentImageIndexModal === 0 ? images.length - 1 : currentImageIndexModal - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndexModal(
      currentImageIndexModal === images.length - 1 ? 0 : currentImageIndexModal + 1
    );
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(4px)",
        zIndex: 1101,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <ArrowCircleLeft
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 5, md: 370 },
          cursor: "pointer",
          width: { xs: "2rem", md: "3rem" },
          height: { xs: "2rem", md: "3rem" },
          color: "white",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handlePrevClick();
        }}
      />
      <ArrowCircleRight
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 5, md: 370 },
          cursor: "pointer",
          width: { xs: "2rem", md: "3rem" },
          height: { xs: "2rem", md: "3rem" },
          color: "white",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleNextClick();
        }}
      />
      <Box
        sx={{
          width: { xs: "280px", md: 500 },
          aspectRatio: "1/1",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={images[currentImageIndexModal].url}
          alt="Product"
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "100%",
          }}
          onClickCapture={(e) => e.stopPropagation()}
        />
      </Box>

      <CloseOutlined
        sx={{
          position: "absolute",
          top: { xs: 50, md: 60 },
          right: { xs: 20, md: 70 },
          cursor: "pointer",
          color: "white",
          "&:hover": {
            color: "black",
          },
          width: { xs: 20, md: 30 },
          height: { xs: 20, md: 30 },
        }}
        onClick={onClose}
      />
    </Box>
  );
}

export default ProductImageModal;
