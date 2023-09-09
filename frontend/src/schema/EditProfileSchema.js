import * as yup from "yup";

const editProfileSchema = yup.object({
    name: yup
        .string()
        .required("Phone number is required"),
    bio: yup
        .string()
        .required("Please add bio"),
    website: yup
        .string()
        .required("Please add your portfolio"),
    phone: yup
        .number("Must be a valid phone number")
        .min(1000000000, "Please enter a valid phone")
        .max(9999999999, "Please enter a valid phone")
        .required(),
});

export default editProfileSchema;