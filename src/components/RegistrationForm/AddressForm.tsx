import type { Dispatch, SetStateAction } from "react";
import type { Address } from "../../shared/types/userAddress";
import type { AddressErrorText } from "../../shared/types/UserRegistration";
import {
  TextField,
  Grid,
  Typography,
  Box,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

type AddressFormProps = {
  addressTitle: string;
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  errorText?: AddressErrorText;
  useDefaultAddress?: boolean;
  setUseDefaultAddress?: Dispatch<SetStateAction<boolean>>;
  isDisabled?: boolean;
};

function AddressForm({
  addressTitle,
  address,
  setAddress,
  errorText,
  useDefaultAddress,
  setUseDefaultAddress,
  isDisabled,
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
            disabled={isDisabled}
            value={address.country}
            onChange={() => setAddress}
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
            disabled={isDisabled}
            value={address.city}
            onChange={() => setAddress}
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
            disabled={isDisabled}
            value={address.street}
            onChange={() => setAddress}
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
            disabled={isDisabled}
            value={address.postalCode}
            onChange={() => setAddress}
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

export default AddressForm;
