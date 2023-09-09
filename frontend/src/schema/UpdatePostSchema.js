import * as yup from "yup";

const updatePostSchema = yup.object({
    postText: yup
        .string()
        .required("Text is required"),
});

export default updatePostSchema;