import * as yup from "yup";

const updateCommentSchema = yup.object({
    text: yup
        .string()
        .required("Text is required"),
});

export default updateCommentSchema;