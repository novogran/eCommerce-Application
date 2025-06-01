import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
import ProductImageModal from "./ProductImageModal";

type ProductSliderProps = {
  images: {
    url: string;
  }[];
};

function ProductSlider({ images }: ProductSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? images.length - 1 : prev + 1));
  };

  return (
    <Box display="flex" alignItems="center" gap={1} position="relative" alignSelf="center">
      {isModalOpen && (
        <ProductImageModal
          images={images}
          currentImageIndex={currentImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <span
        style={{
          cursor: "pointer",
          color: currentImageIndex === 0 ? "gray" : "black",
          fontSize: "2rem",
        }}
        onClick={handlePrevClick}
      >
        <ArrowCircleLeft style={{ width: "2rem", height: "2rem" }} />
      </span>
      <Box
        style={{
          backgroundImage: `url(${images[currentImageIndex].url})`,
          backgroundSize: "contain",
          backgroundColor: "white",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          cursor: "pointer",
        }}
        sx={{
          width: { xs: "250px", md: "30vw" },
          height: { xs: "300px", md: "60vh" },
        }}
        onClick={() => setIsModalOpen(true)}
      ></Box>
      <span
        style={{
          cursor: "pointer",
          color: currentImageIndex === images.length - 1 ? "gray" : "black",
          fontSize: "2rem",
        }}
        onClick={handleNextClick}
      >
        <ArrowCircleRight style={{ width: "2rem", height: "2rem" }} />
      </span>
      {images.length > 1 && (
        <Box display="flex" alignItems="center" gap={1} position="absolute" bottom={-20} left="45%">
          {images.map((_, index) => (
            <span
              key={index}
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: currentImageIndex === index ? "white" : "gray",
                borderRadius: "50%",
                border: "1px solid gray",
                cursor: "pointer",
              }}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProductSlider;
