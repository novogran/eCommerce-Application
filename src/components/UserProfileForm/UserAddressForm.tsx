import { ERROR_MESSAGES } from "../../shared/const/formValidationErrorLabels.const";
import type { Address } from "../../shared/types/userAddress.types";
import {
  TextField,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { AddressErrorValidation } from "../../shared/types/userRegistration.types";

type UserAddressFormProps = {
  address: Address;
  addressIndex: number;
  onAddressChange: (name: string, field: string) => void;
  isAddressValid?: AddressErrorValidation;
  defaultShippingId?: string;
  defaultBillingId?: string;
  shippingIds?: string[];
  billingIds?: string[];
  setDefaultAddress: (type: "shipping" | "billing", id: string) => void;
  toggleAddressType: (type: "shipping" | "billing", checked: boolean, index: number) => void;
};

function UserAddressForm({
  address,
  addressIndex,
  onAddressChange,
  defaultShippingId,
  defaultBillingId,
  shippingIds = [],
  billingIds = [],
  isAddressValid = {
    isStreetValid: true,
    isCityValid: true,
    isPostalCodeValid: true,
    isCountryValid: true,
  },
  setDefaultAddress,
  toggleAddressType,
}: UserAddressFormProps) {
  const identifier = address.id || address.key || "";

  const isDefaultShipping = identifier === defaultShippingId;
  const isDefaultBilling = identifier === defaultBillingId;
  const isInShipping = shippingIds.includes(identifier);
  const isInBilling = billingIds.includes(identifier);

  const handleDefaultChange =
    (type: "shipping" | "billing") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        setDefaultAddress(type, identifier);
      } else {
        setDefaultAddress(type, "");
      }
    };

  const handleTypeToggle =
    (type: "shipping" | "billing") => (e: React.ChangeEvent<HTMLInputElement>) => {
      toggleAddressType(type, e.target.checked, addressIndex);
    };

  return (
    <Box width="100%">
      <Box mb={2}>
        <FormControlLabel
          control={<Checkbox checked={isInShipping} onChange={handleTypeToggle("shipping")} />}
          label="Use for Shipping"
        />
        <FormControlLabel
          control={<Checkbox checked={isInBilling} onChange={handleTypeToggle("billing")} />}
          label="Use for Billing"
        />
      </Box>

      {(isInShipping || isInBilling) && (
        <Box mb={2}>
          {isInShipping && (
            <FormControlLabel
              control={
                <Checkbox checked={isDefaultShipping} onChange={handleDefaultChange("shipping")} />
              }
              label="Default Shipping Address"
            />
          )}
          {isInBilling && (
            <FormControlLabel
              control={
                <Checkbox checked={isDefaultBilling} onChange={handleDefaultChange("billing")} />
              }
              label="Default Billing Address"
            />
          )}
        </Box>
      )}

      <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2} mb={2}>
        <Grid>
          <TextField
            fullWidth
            label="Country*"
            name="country"
            select
            value={address.country || "BY"}
            onChange={(e) => onAddressChange("country", e.target.value)}
          >
            <MenuItem value="BY">BY</MenuItem>
          </TextField>
          {!isAddressValid?.isCountryValid && (
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
            value={address.city}
            onChange={(e) => onAddressChange("city", e.target.value)}
          />
          {!isAddressValid?.isCityValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.CITY_ERROR_TEXT}
            </FormHelperText>
          )}
        </Grid>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "2fr 1fr" }} gap={2}>
        <Grid>
          <TextField
            fullWidth
            label="Street*"
            name="streetName"
            value={address.streetName}
            onChange={(e) => onAddressChange("streetName", e.target.value)}
          />
          {!isAddressValid?.isStreetValid && (
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
            value={address.postalCode}
            onChange={(e) => onAddressChange("postalCode", e.target.value)}
          />
          {!isAddressValid?.isPostalCodeValid && (
            <FormHelperText error sx={{ mx: 0 }}>
              {ERROR_MESSAGES.POSTAL_CODE_ERROR_TEXT}
            </FormHelperText>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default UserAddressForm;
