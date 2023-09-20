import * as yup from "yup";
import instance from "../utils/axiosInstance";

const signupSchema = yup.object({
    name: yup
        .string()
        .required("Phone number is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    username: yup
        .string()
        .matches(/^@/, "Username must start with '@'")
        .min(3, "Username must be atleast 3 character")
        .required("Username is required")
        .test("username", "This username has already been taken",
            function (value) {
                if (value.length > 3) {
                    const url = `/auth/checkusernameavailable?query=${value}`;
                    return new Promise((resolve, reject) => {
                        instance.get(url)
                            .then((res) => {
                                resolve(true)
                            })
                            .catch((error) => {
                                if (error.response.data.content === "Username already taken.") {
                                    resolve(false);
                                }
                            })
                    })
                }
            }),
    phone: yup
        .number("Must be a valid phone number")
        .min(1000000000, "Please enter a valid phone")
        .max(9999999999, "Please enter a valid phone")
        .required(),
    password: yup
        .string()
        .min(6, "Password should be atleast 6 character")
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default signupSchema;