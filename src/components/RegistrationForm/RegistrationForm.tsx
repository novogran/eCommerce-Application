import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, type SetStateAction, type Dispatch } from "react";
import { NavLink } from "react-router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import type {
  UserRegistration,
  UserRegistrationErrorValidation,
} from "../../shared/types/userRegistration.types";
import "./RegistrationForm.css";
import dayjs, { Dayjs } from "dayjs";
import AddressForm from "./AddressForm";

type RegistrationFormProps = {
  userProps: UserRegistration;
  onPropChange: (name: string, field: string | boolean) => void;
  isUserPropsValid: UserRegistrationErrorValidation;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitError: string | null;
  useOneAddress: boolean;
  setUseOneAddress: Dispatch<SetStateAction<boolean>>;
  onShippingAddressPropChange: (name: string, field: string) => void;
  onBillingAddressPropChange: (name: string, field: string) => void;
};

function RegistrationForm({
  userProps,
  onPropChange,
  isUserPropsValid,
  onSubmit,
  submitError,
  useOneAddress,
  setUseOneAddress,
  onShippingAddressPropChange,
  onBillingAddressPropChange,
}: RegistrationFormProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const minDate = dayjs().subtract(13, "year");
  const EMAIL_ERROR_TEXT = "Incorrect email, must be: user@example.com";
  const PASSWORD_ERROR_TEXT =
    "Incorrect password, must be at least 8 characters long, contains at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9)";
  const FIRST_NAME_ERROR_TEXT =
    "Incorrect first name, must contain at least one character and no special characters or numbers";
  const LAST_NAME_ERROR_TEXT =
    "Incorrect last name, must contain at least one character and no special characters or numbers";
  const DOB_ERROR_TEXT = "Incorrect date, you must be at least 13 years old";

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, minWidth: { xs: "80vw", sm: "480px" } }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign up
        </Typography>
        <form noValidate onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={1} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="Email*"
                name="email"
                type="email"
                variant="outlined"
                value={userProps?.email}
                onChange={(e) => onPropChange("email", e.target.value)}
              />
              {userProps.email && !isUserPropsValid.isEmailValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {EMAIL_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>
            <Box
              display={"grid"}
              alignItems={"start"}
              gap={1}
              sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" }, alignContent: "start" }}
            >
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "1 / 2" },
                  gridRow: { xs: "1 / 2", sm: "1 / 2" },
                }}
              >
                <TextField
                  fullWidth
                  label="First Name*"
                  name="firstName"
                  type="text"
                  variant="outlined"
                  value={userProps?.firstName}
                  onChange={(e) => onPropChange("firstName", e.target.value)}
                />
                {userProps.firstName && !isUserPropsValid.isFirstNameValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {FIRST_NAME_ERROR_TEXT}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "2 / 3" },
                  gridRow: { xs: "3 / 4", sm: "2 / 3" },
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth*"
                    value={userProps.dob ? dayjs(userProps.dob) : dayjs("")}
                    onChange={(value: Dayjs | null) => {
                      const dateString = value?.format("YYYY-MM-DD") || "";
                      onPropChange("dob", dateString);
                    }}
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disableHighlightToday
                    className="date-picker"
                    maxDate={minDate}
                  />
                </LocalizationProvider>
                {userProps.dob && !isUserPropsValid.isDobValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {DOB_ERROR_TEXT}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                sx={{
                  gridColumn: { xs: "1 / 2", sm: "1 / 2" },
                  gridRow: { xs: "2 / 3", sm: "2 / 3" },
                }}
              >
                <TextField
                  fullWidth
                  label="Last Name*"
                  name="lastName"
                  type="text"
                  variant="outlined"
                  value={userProps?.lastName}
                  onChange={(e) => onPropChange(e.target.name, e.target.value)}
                />
                {userProps.lastName && !isUserPropsValid.isLastNameValid && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {LAST_NAME_ERROR_TEXT}
                  </FormHelperText>
                )}
              </Grid>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useOneAddress}
                  onChange={() => setUseOneAddress(!useOneAddress)}
                  color="primary"
                />
              }
              label="Use one address for both shipping and billing"
            />
            <AddressForm
              addressTitle="Shipping"
              address={userProps.shippingAddress}
              onAddressChange={onShippingAddressPropChange}
              isAddressValid={isUserPropsValid.isShippingAddressValid}
              useDefaultAddress={userProps.isDefaultShipping}
              setUseDefaultAddress={onPropChange}
            />
            <AddressForm
              addressTitle="Billing"
              address={!useOneAddress ? userProps.billingAddress : userProps.shippingAddress}
              onAddressChange={onBillingAddressPropChange}
              isAddressValid={
                !useOneAddress
                  ? isUserPropsValid.isBillingAddressValid
                  : isUserPropsValid.isShippingAddressValid
              }
              useDefaultAddress={userProps.isDefaultBilling}
              setUseDefaultAddress={onPropChange}
              useOneAddress={useOneAddress}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  color="primary"
                />
              }
              label="Show password"
            />
            <Grid>
              <TextField
                fullWidth
                label="Password*"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={userProps?.password}
                onChange={(e) => onPropChange(e.target.name, e.target.value)}
              />
              {userProps.password && !isUserPropsValid.isPasswordValid && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {PASSWORD_ERROR_TEXT}
                </FormHelperText>
              )}
            </Grid>
            {!!submitError && (
              <FormHelperText error sx={{ mx: 0 }}>
                {submitError}
              </FormHelperText>
            )}
            <Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                formNoValidate
                sx={{ mt: 1 }}
              >
                Sign up
              </Button>
            </Grid>
            <Grid container>
              <Grid>
                <NavLink to="/login">{"Have an account already? Sign In"}</NavLink>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default RegistrationForm;
