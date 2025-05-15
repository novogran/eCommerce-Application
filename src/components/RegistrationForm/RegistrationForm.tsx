import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Link,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Link as RouterLink } from "react-router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import type {
  UserRegistration,
  UserRegistrationErrorText,
  AddressErrorText,
} from "../../shared/types/UserRegistration";
import type { Address } from "../../shared/types/Address";

type RegistrationFormProps = {
  userProps?: UserRegistration;
  errorTextProps?: UserRegistrationErrorText;
  onUserPropsChange?: () => void;
  onSubmit?: () => void;
};

function RegistrationForm({
  userProps,
  errorTextProps,
  onUserPropsChange,
  onSubmit,
}: RegistrationFormProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [useOneAddress, setUseOneAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});

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
        <form onSubmit={onSubmit}>
          <Grid container spacing={0.5} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="Email*"
                name="email"
                type="email"
                variant="outlined"
                value={userProps?.email}
                onChange={onUserPropsChange}
              />
              {!!errorTextProps?.emailErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {errorTextProps?.emailErrorText}
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
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.firstNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.firstNameErrorText}
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
                    value={userProps?.dob}
                    onChange={onUserPropsChange}
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    disableHighlightToday
                  />
                </LocalizationProvider>
                {!!errorTextProps?.dobErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.dobErrorText}
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
                  onChange={onUserPropsChange}
                />
                {!!errorTextProps?.lastNameErrorText && (
                  <FormHelperText error sx={{ mx: 0 }}>
                    {errorTextProps?.lastNameErrorText}
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
            <AddressField
              addressTitle="Shipping address"
              address={shippingAddress}
              setAddress={setShippingAddress}
            />
            <AddressField
              addressTitle="Billing address"
              address={useOneAddress ? billingAddress : setShippingAddress}
              setAddress={setBillingAddress}
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
                onChange={onUserPropsChange}
              />
              {!!errorTextProps?.passwordErrorText && (
                <FormHelperText error sx={{ mx: 0 }}>
                  {errorTextProps?.passwordErrorText}
                </FormHelperText>
              )}
            </Grid>
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
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Have an account already? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

type AddressFormProps = {
  addressTitle: string;
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  errorText?: AddressErrorText;
  useDefaultAddress?: boolean;
  setUseDefaultAddress?: Dispatch<SetStateAction<boolean>>;
};

function AddressField({
  addressTitle,
  address,
  setAddress,
  errorText,
  useDefaultAddress,
  setUseDefaultAddress,
}: AddressFormProps): React.ReactElement {
  return (
    <Box>
      <Box
        display={"grid"}
        alignItems={"start"}
        gap={1}
        sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, alignContent: "start" }}
      >
        <Typography variant="h5" component="h1" align="left" gutterBottom my={0.5}>
          {addressTitle}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={useDefaultAddress}
              onChange={() => setUseDefaultAddress}
              color="primary"
            />
          }
          label="Use address as default"
        />
      </Box>
      <Box
        display={"grid"}
        alignItems={"center"}
        gap={1}
        sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, alignContent: "center" }}
      >
        <Grid>
          <TextField
            fullWidth
            label="Country*"
            name="country"
            type="text"
            variant="outlined"
            value={address.country}
            onChange={(e) => setAddress?.((prev) => ({ ...prev, country: e.target.value }))}
          />
          {!!errorText?.countryErrorText && (
            <FormHelperText error sx={{ mx: 0 }}>
              {errorText?.countryErrorText}
            </FormHelperText>
          )}
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="City*"
            name="city"
            type="text"
            variant="outlined"
            value={address.city}
            onChange={(e) => setAddress?.((prev) => ({ ...prev, city: e.target.value }))}
          />
          {!!errorText?.cityErrorText && (
            <FormHelperText error sx={{ mx: 0 }}>
              {errorText?.cityErrorText}
            </FormHelperText>
          )}
        </Grid>
      </Box>
      <Box
        display={"grid"}
        alignItems={"center"}
        gap={1}
        mt={1}
        sx={{ gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" }, alignContent: "center" }}
      >
        <Grid>
          <TextField
            fullWidth
            label="Street*"
            name="street"
            type="text"
            variant="outlined"
            value={address.street}
            onChange={(e) => setAddress?.((prev) => ({ ...prev, street: e.target.value }))}
          />
          {!!errorText?.streetErrorText && (
            <FormHelperText error sx={{ mx: 0 }}>
              {errorText?.streetErrorText}
            </FormHelperText>
          )}
        </Grid>
        <Grid>
          <TextField
            fullWidth
            label="Postal Code*"
            name="postalCode"
            type="text"
            variant="outlined"
            value={address.postalCode}
            onChange={(e) => setAddress?.((prev) => ({ ...prev, postalCode: e.target.value }))}
          />
          {!!errorText?.postalCodeErrorText && (
            <FormHelperText error sx={{ mx: 0 }}>
              {errorText?.postalCodeErrorText}
            </FormHelperText>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
