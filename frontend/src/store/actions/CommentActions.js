import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";

export const addCommentFn = (data , postId) => async (dispatch) => {
    dispatch({ type: "ADD_COMMENT_REQUEST" });
    const url = `/comment/add/${postId}`;
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        dispatch({ type: "ADD_COMMENT_FAILURE" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "ADD_COMMENT_SUCCESS", payload: response.data?.comment });
        }
    }
};
export const fetchCommentsOfPostFn = (postId) => async (dispatch) => {
    dispatch({ type: "FETCH_COMMENT_REQUEST" });
    const url = `/comment/all/${postId}`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "FETCH_COMMENT_FAILURE" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "FETCH_COMMENT_SUCCESS", payload: response.data?.comments });
        }
    }
};

export const likeCommentFn = (commentId, userId) => async (dispatch) => {
    const url = `/comment/like/${commentId}`;
    let response = {};
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        return false;
    } finally {
        if (response?.status === 200) {
            return true;
        }
    }
}
export const dislikeCommentFn = (commentId, userId) => async (dispatch) => {
    const url = `/comment/dislike/${commentId}`;
    let response = {};
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        return false;
    } finally {
        if (response?.status === 200) {
            return true;
        }
    }
}
export const deleteCommentFn = (commentId) => async (dispatch) => {
    const url = `/comment/delete/${commentId}`;
    let response = {};
    try {
        response = await instance.delete(url);
    } catch (error) {
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({type : "DELETE_COMMENT_SUCCESS" , payload : commentId});
        }
    }
}
export const editCommentFn = (commentId , data , setErrorMsg) => async (dispatch) => {
    const url = `/comment/update/${commentId}`;
    let response = {};
    try {
        response = await instance.patch(url , data);
    } catch (error) {
        setErrorMsg(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            toast.success("Comment updated");
            // dispatch({type : "DELETE_COMMENT_SUCCESS" , payload : commentId});
        }
    }
}

