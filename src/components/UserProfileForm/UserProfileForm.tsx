import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UserAddressForm from "./UserAddressForm";
import type { Customer } from "../../shared/types/api.types";
import type { Address } from "../../shared/types/userAddress.types";
import { ERROR_MESSAGES } from "../../shared/const/formValidationErrorLabels.const";
import type { UserProfileErrorValidation } from "../../shared/types/userProfile.types";

type UserProfileFormProps = {
  editMode: boolean;
  isUserPropsValid: UserProfileErrorValidation;
  isUserPasswordsValid: {
    current: boolean;
    new: boolean;
    confirm: boolean;
  };
  tempUser: Customer;
  passwords: {
    current: string;
    new: string;
    confirm: string;
  };
  showPassword: boolean;
  onEditToggle: () => void;
  onCancelEdit: () => void;
  onPersonalInfoChange: (field: keyof Customer, value: string) => void;
  onAddressChange: (index: number, updatedAddress: Address) => void;
  onAddAddress: () => void;
  onDeleteAddress: (index: number) => void;
  onPasswordChange: (field: string, value: string) => void;
  onShowPasswordToggle: () => void;
  onSubmitPassword: () => void;
  onSetDefaultAddress: (type: "shipping" | "billing", id: string) => void;
  onToggleAddressType: (type: "shipping" | "billing", checked: boolean, index: number) => void;
};

export default function UserProfileForm({
  editMode,
  tempUser,
  passwords,
  showPassword,
  isUserPropsValid,
  isUserPasswordsValid,
  onEditToggle,
  onCancelEdit,
  onPersonalInfoChange,
  onAddressChange,
  onAddAddress,
  onDeleteAddress,
  onPasswordChange,
  onShowPasswordToggle,
  onSubmitPassword,
  onSetDefaultAddress,
  onToggleAddressType,
}: UserProfileFormProps) {
  const minDate = dayjs().subtract(13, "year").subtract(1, "day");
  const renderAddressInfo = (address: Address) => {
    const identifier = address.id || address.key || "";
    const isDefaultShipping = identifier === tempUser.defaultShippingAddressId;
    const isDefaultBilling = identifier === tempUser.defaultBillingAddressId;
    const isShipping = tempUser.shippingAddressIds?.includes(identifier);
    const isBilling = tempUser.billingAddressIds?.includes(identifier);

    return (
      <>
        <ListItemText
          primary={`${address.streetName}, ${address.city}`}
          secondary={`${address.postalCode}, ${address.country}`}
        />
        <ListItemText
          secondary={
            <Box component="span">
              {isShipping && <span>Shipping{isDefaultShipping ? " (Default)" : ""}</span>}
              {isShipping && isBilling && <br />}
              {isBilling && <span>Billing{isDefaultBilling ? " (Default)" : ""}</span>}
            </Box>
          }
        />
      </>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4">User Profile</Typography>
        <Box display={"flex"} gap={2}>
          <Button variant="contained" onClick={onEditToggle} startIcon={<EditIcon />}>
            {editMode ? "Save Changes" : "Edit Profile"}
          </Button>
          {editMode && (
            <Button variant="outlined" onClick={onCancelEdit} color="error">
              Cancel
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={3} display={"flex"} direction={"column"}>
          <Grid>
            <TextField
              fullWidth
              label="First Name*"
              name="firstName"
              type="text"
              variant="outlined"
              value={tempUser.firstName}
              onChange={(e) => onPersonalInfoChange("firstName", e.target.value)}
              disabled={!editMode}
            />
            {!isUserPropsValid.isFirstNameValid && (
              <FormHelperText error sx={{ mx: 0 }}>
                {ERROR_MESSAGES.FIRST_NAME_ERROR_TEXT}
              </FormHelperText>
            )}
          </Grid>

          <Grid>
            <TextField
              fullWidth
              label="Last Name*"
              name="lastName"
              type="text"
              variant="outlined"
              value={tempUser.lastName}
              onChange={(e) => onPersonalInfoChange("lastName", e.target.value)}
              disabled={!editMode}
            />
            {!isUserPropsValid.isLastNameValid && (
              <FormHelperText error sx={{ mx: 0 }}>
                {ERROR_MESSAGES.LAST_NAME_ERROR_TEXT}
              </FormHelperText>
            )}
          </Grid>

          <Grid>
            <TextField
              fullWidth
              label="Email*"
              name="email"
              type="email"
              variant="outlined"
              value={tempUser.email}
              onChange={(e) => onPersonalInfoChange("email", e.target.value)}
              disabled={!editMode}
            />
            {!isUserPropsValid.isEmailValid && (
              <FormHelperText error sx={{ mx: 0 }}>
                {ERROR_MESSAGES.EMAIL_ERROR_TEXT}
              </FormHelperText>
            )}
          </Grid>

          <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth*"
                className="date-picker"
                name="dateOfBirth"
                value={tempUser.dateOfBirth ? dayjs(tempUser.dateOfBirth) : dayjs("")}
                onChange={(value: Dayjs | null) => {
                  const dateString = value?.format("YYYY-MM-DD") || "";
                  onPersonalInfoChange("dateOfBirth", dateString);
                }}
                sx={{ width: "100%" }}
                format="DD/MM/YYYY"
                disableFuture
                disableHighlightToday
                maxDate={minDate}
                disabled={!editMode}
                slotProps={{
                  textField: {
                    error: !!tempUser.dateOfBirth && !isUserPropsValid.isDobValid,
                  },
                }}
              />
            </LocalizationProvider>
            {!isUserPropsValid.isDobValid && (
              <FormHelperText error sx={{ mx: 0 }}>
                {ERROR_MESSAGES.DOB_ERROR_TEXT}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Addresses</Typography>
          {editMode && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddAddress}>
              Add Address
            </Button>
          )}
        </Box>

        <List>
          {tempUser.addresses.map((address, index) => (
            <div key={address.id || address.key || index}>
              <ListItem>
                {editMode ? (
                  <UserAddressForm
                    address={address}
                    addressIndex={index}
                    onAddressChange={(field, value) =>
                      onAddressChange(index, { ...address, [field]: value })
                    }
                    isAddressValid={
                      isUserPropsValid.isAddressesValidArr[index] || {
                        isStreetValid: true,
                        isCityValid: true,
                        isPostalCodeValid: true,
                        isCountryValid: true,
                      }
                    }
                    defaultShippingId={tempUser.defaultShippingAddressId}
                    defaultBillingId={tempUser.defaultBillingAddressId}
                    shippingIds={tempUser.shippingAddressIds || []}
                    billingIds={tempUser.billingAddressIds || []}
                    setDefaultAddress={onSetDefaultAddress}
                    toggleAddressType={onToggleAddressType}
                  />
                ) : (
                  renderAddressInfo(address)
                )}

                {editMode && (
                  <IconButton
                    edge="end"
                    onClick={() => onDeleteAddress(index)}
                    aria-label="Delete address"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
              {index < tempUser.addresses.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>

      {editMode && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Grid container spacing={2} display={"flex"} direction={"column"}>
            <Grid>
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => onPasswordChange("current", e.target.value)}
              />
              {passwords.current && !isUserPasswordsValid.current && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGES.PASSWORD_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => onPasswordChange("new", e.target.value)}
              />
              {passwords.new && !isUserPasswordsValid.new && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGES.PASSWORD_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>

            <Grid>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => onPasswordChange("confirm", e.target.value)}
              />
              {passwords.confirm && !isUserPasswordsValid.confirm && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {ERROR_MESSAGES.PASSWORD_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>

            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={onShowPasswordToggle}
                    color="primary"
                  />
                }
                label="Show password"
              />

              <Button
                variant="contained"
                onClick={onSubmitPassword}
                disabled={
                  !passwords.current || !passwords.new || passwords.new !== passwords.confirm
                }
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
