import { z } from "zod";

export const nameSchema = z
  .string({ message: "Invalid name || name has to be a string" })
  .min(1, { message: "Name can not be empty" })
  .max(50, { message: "Name can not be more than 50 characters" });

export const addressSchema = z
  .string({ message: "Invalid address || address has to be a string" })
  .min(1, { message: "Address can not be empty" })
  .max(100, { message: "Address can not be more than 100 characters" });

export const latitudeSchema = z.number().refine(
  (value) => {
    const len = value.toString().replace(".", "").length;
    return len > 0;
  },
  {
    message: "Latitude can not be empty",
  }
);

export const longitudeSchema = z.number().refine(
  (value) => {
    const len = value.toString().replace(".", "").length;
    return len > 0;
  },
  {
    message: "Latitude can not be empty",
  }
);
