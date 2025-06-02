import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import ProductSlider from "./ProductSlider";
import "@testing-library/jest-dom";

vi.mock("@mui/icons-material", () => ({
  ArrowCircleLeft: () => <div data-testid="arrow-left" />,
  ArrowCircleRight: () => <div data-testid="arrow-right" />,
}));

vi.mock("./ProductImageModal", () => ({
  default: vi.fn(() => <div data-testid="modal" />),
}));

const mockImages = [{ url: "image1.jpg" }, { url: "image2.jpg" }, { url: "image3.jpg" }];

describe("ProductSlider", () => {
  const user = userEvent.setup();

  it("renders arrows and dots", () => {
    render(<ProductSlider images={mockImages} />);

    expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /dot/i })).toHaveLength(3);
  });

  it("correctly switches images", async () => {
    render(<ProductSlider images={mockImages} />);

    const dots = screen.getAllByRole("button", { name: /dot/i });

    await user.click(screen.getByTestId("arrow-right"));
    expect(dots[1]).toHaveStyle("background-color: rgb(255, 255, 255)");

    await user.click(screen.getByTestId("arrow-left"));
    expect(dots[0]).toHaveStyle("background-color: rgb(255, 255, 255)");
  });

  it("opens modal window when clicking on image", async () => {
    render(<ProductSlider images={mockImages} />);

    const imageContainer = screen.getByTestId("image-container");
    await user.click(imageContainer);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("does not display dots when there is only one image", () => {
    render(<ProductSlider images={[mockImages[0]]} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
