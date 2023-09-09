import * as yup from "yup";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password should be atleast 6 character")
        .required(),
});

export default loginSchema;