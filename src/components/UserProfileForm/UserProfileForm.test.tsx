import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import UserProfileForm from "./UserProfileForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import type { Customer } from "../../shared/types/api.types";

describe("UserProfileForm", () => {
  const mockUser: Customer = {
    id: "1",
    version: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1990-01-01",
    addresses: [
      {
        id: "addr1",
        streetName: "123 Main St",
        city: "New York",
        postalCode: "10001",
        country: "US",
      },
    ],
    defaultShippingAddressId: "addr1",
    defaultBillingAddressId: "addr1",
    shippingAddressIds: ["addr1"],
    billingAddressIds: ["addr1"],
  };

  const mockProps = {
    editMode: false,
    tempUser: mockUser,
    passwords: { current: "", new: "", confirm: "" },
    showPassword: false,
    isUserPropsValid: {
      isFirstNameValid: true,
      isLastNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isDobValid: true,
      isAddressesValidArr: [
        {
          isStreetValid: true,
          isCityValid: true,
          isPostalCodeValid: true,
          isCountryValid: true,
        },
      ],
    },
    isUserPasswordsValid: {
      current: false,
      new: false,
      confirm: false,
    },
    onEditToggle: vi.fn(),
    onCancelEdit: vi.fn(),
    onPersonalInfoChange: vi.fn(),
    onAddressChange: vi.fn(),
    onAddAddress: vi.fn(),
    onDeleteAddress: vi.fn(),
    onPasswordChange: vi.fn(),
    onShowPasswordToggle: vi.fn(),
    onSubmitPassword: vi.fn(),
    onSetDefaultAddress: vi.fn(),
    onToggleAddressType: vi.fn(),
  };

  const renderComponent = (props = mockProps) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProfileForm {...props} />
      </LocalizationProvider>
    );
  };

  it("renders the component with all main sections", () => {
    renderComponent();

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Addresses")).toBeInTheDocument();
    expect(screen.queryByText("Change Password")).not.toBeInTheDocument();
  });

  it("displays user information in view mode", () => {
    renderComponent();

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, New York")).toBeInTheDocument();
    expect(screen.getByText("10001, US")).toBeInTheDocument();
  });

  it("shows edit button in view mode", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit profile/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toContainElement(screen.getByTestId("EditIcon"));
  });

  it("displays all form fields in edit mode", () => {
    renderComponent({ ...mockProps, editMode: true });

    expect(screen.getByLabelText("First Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(document.querySelector(".date-picker")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add address/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Change Password" })).toBeInTheDocument();
  });

  it("shows cancel button in edit mode", () => {
    renderComponent({ ...mockProps, editMode: true });

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveClass("MuiButton-outlined");
  });

  it("displays password fields in edit mode", () => {
    renderComponent({ ...mockProps, editMode: true });

    expect(screen.getByLabelText("Current Password")).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Show password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /change password/i })).toBeInTheDocument();
  });

  it("shows address type indicators correctly", () => {
    renderComponent();

    expect(screen.getByText("Shipping (Default)")).toBeInTheDocument();
    expect(screen.getByText("Billing (Default)")).toBeInTheDocument();
  });

  it("displays validation errors when fields are invalid", () => {
    const invalidProps = {
      ...mockProps,
      editMode: true,
      isUserPropsValid: {
        isFirstNameValid: false,
        isLastNameValid: false,
        isPasswordValid: false,
        isEmailValid: false,
        isDobValid: false,
        isAddressesValidArr: [
          {
            isStreetValid: false,
            isCityValid: false,
            isPostalCodeValid: false,
            isCountryValid: false,
          },
        ],
      },
    };

    renderComponent(invalidProps);

    expect(screen.getByText(/Incorrect first name/i)).toBeInTheDocument();
    expect(screen.getByText(/Incorrect email, must be: user@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/must be at least 13 years old/i)).toBeInTheDocument();
  });

  it("calls onEditToggle when edit/save button is clicked", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /edit profile/i });
    fireEvent.click(editButton);
    expect(mockProps.onEditToggle).toHaveBeenCalled();
  });

  it("calls onCancelEdit when cancel button is clicked", () => {
    renderComponent({ ...mockProps, editMode: true });

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockProps.onCancelEdit).toHaveBeenCalled();
  });

  it("calls onAddAddress when add address button is clicked", () => {
    renderComponent({ ...mockProps, editMode: true });

    const addButton = screen.getByRole("button", { name: /add address/i });
    fireEvent.click(addButton);
    expect(mockProps.onAddAddress).toHaveBeenCalled();
  });

  it("calls onShowPasswordToggle when show password checkbox is clicked", () => {
    renderComponent({ ...mockProps, editMode: true });

    const checkbox = screen.getByLabelText("Show password");
    fireEvent.click(checkbox);
    expect(mockProps.onShowPasswordToggle).toHaveBeenCalled();
  });

  it("renders delete button for each address in edit mode", () => {
    renderComponent({ ...mockProps, editMode: true });

    const deleteButtons = screen.getAllByRole("button", { name: /delete address/i });
    expect(deleteButtons).toHaveLength(mockUser.addresses.length);
    expect(deleteButtons[0]).toContainElement(screen.getByTestId("DeleteIcon"));
  });
});
