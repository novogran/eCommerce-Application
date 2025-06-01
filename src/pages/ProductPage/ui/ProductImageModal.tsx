import { CloseOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

function ProductImageModal({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1101,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Product"
        width={300}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClickCapture={(e) => e.stopPropagation()}
      />
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
