import type { Address } from "../../shared/types/userAddress.types";
import type { AddressErrorValidation } from "../../shared/types/userRegistration.types";
import {
  TextField,
  Grid,
  Typography,
  Box,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { ERROR_MESSAGES } from "../../shared/const/formValidationErrorLabels.const";

type AddressFormProps = {
  addressTitle: string;
  address?: Address;
  onAddressChange: (name: string, field: string) => void;
  isAddressValid?: AddressErrorValidation;
  useDefaultAddress?: boolean;
  setUseDefaultAddress: (name: string, field: boolean) => void;
  useOneAddress?: boolean;
};

function AddressForm({
  addressTitle,
  address,
  onAddressChange,
  isAddressValid,
  useDefaultAddress,
  setUseDefaultAddress,
  useOneAddress,
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
          {`${addressTitle} address`}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={useDefaultAddress}
              onChange={(e) => setUseDefaultAddress(`isDefault${addressTitle}`, e.target.checked)}
              color="primary"
            />
          }
          label="Use address as default"
        />
      </Box>
      <Box
        display={"grid"}
        alignItems={"start"}
        gap={1}
        sx={{ gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, alignContent: "start" }}
      >
        <Grid>
          <TextField
            fullWidth
            label="Country*"
            name="country"
            select
            variant="outlined"
            disabled={useOneAddress}
            value={address?.country || "BY"}
            onChange={(e) => onAddressChange("country", e.target.value)}
          >
            <MenuItem value="BY" onClick={() => onAddressChange("country", "BY")}>
              BY
            </MenuItem>
          </TextField>
          {address?.country && !isAddressValid?.isCountryValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.COUNTRY_ERROR_TEXT}
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
            disabled={useOneAddress}
            value={address?.city}
            onChange={(e) => onAddressChange("city", e.target.value)}
          />
          {address?.city && !isAddressValid?.isCityValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.CITY_ERROR_TEXT}
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
            disabled={useOneAddress}
            value={address?.street}
            onChange={(e) => onAddressChange("street", e.target.value)}
          />
          {address?.street && !isAddressValid?.isStreetValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.STREET_ERROR_TEXT}
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
            disabled={useOneAddress}
            value={address?.postalCode}
            onChange={(e) => onAddressChange("postalCode", e.target.value)}
          />
          {address?.postalCode && !isAddressValid?.isPostalCodeValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.POSTAL_CODE_ERROR_TEXT}
            </FormHelperText>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default AddressForm;
