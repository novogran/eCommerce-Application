import type { Dayjs } from "dayjs";

export type UserRegistration = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dob?: Dayjs;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};
