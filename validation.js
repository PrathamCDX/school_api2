import { z } from "zod";

// export const emailSchema = z
//   .email({ message: "Invalid email address" })
//   .min(1, { message: "Email can not be empty" });

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

// export const latitudeSchema = z
//   .number({
//     message: "Latitude need to be a number",
//   })
//   .min(1, { message: "Latitude can not be empty" })
//   .max(10, { message: "Latitude can not be more than 10 digits" });

// export const longitudeSchema = z
//   .number({
//     message: "Longitute need to be a number",
//   })
//   .min(1, { message: "Longitute can not be empty" })
//   .max(10, { message: "Latitude can not be more than 10 digits" });

// const time = z.string().time();

// time.parse("00:00:00"); // pass
// time.parse("09:52:31"); // pass
// time.parse("23:59:59.9999999"); // pass (arbitrary precision)

// time.parse("00:00:00.123Z"); // fail (no `Z` allowed)
// time.parse("00:00:00.123+02:00"); //

// const listSchoolsRequestSchema = z.any();

// const addSchoolsRequestSchema = z.any();
