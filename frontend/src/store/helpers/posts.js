import toast from "react-hot-toast";
import instance from "../../utils/axiosInstance";
import { formatErrorMessage } from "../../utils/formatError";

export const fetchPostsForFeed = async (page) => {
    const url = `post/feed?page=${page}&limit=5&query=latest`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(formatErrorMessage(error?.response?.data?.msg));
    } finally {
        if (response?.status === 200) {
            return response.data?.posts
        }
    }
}