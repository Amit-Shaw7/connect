import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";

export const addPostFn = (data, dataToShow) => async (dispatch) => {
    const url = "/post";
    let response = {};
    dispatch({ type: "ADD_POST_SUCCESS", payload: dataToShow });
    try {
        response = await instance.post(url, data);
    } catch (error) {
        toast.error(error.response.data.msg);
        window.location.reload();
    } finally {
        if (response?.status === 200) {
            toast.success("Post Added Successfully");
        }
    }
};

export const fetchMyPostsFn = (type) => async (dispatch) => {
    const url = `post/myposts?query=${type.toLowerCase()}`;
    let response = {};

    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_MY_POST_SUCCESS", payload: response.data?.posts });
        }
    }
}

export const getPostsForFeedFn = (type, setLoading) => async (dispatch) => {
    setLoading(true);
    const url = `post/feed?query=${type.toLowerCase()}`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_ALL_POST_SUCCESS", payload: response.data?.posts });
            setLoading(false);
        }
    }
}

export const getPostsForExplorefn = (type, setLoading) => async (dispatch) => {
    const url = `post/explore?query=${type.toLowerCase()}`;
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            setLoading(false);
            return response.data?.posts;
        }
    }
}


export const getSavedPostsFn = (setLoading) => async (dispatch) => {
    const url = "post/savedposts";
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_SAVED_POST_SUCCESS", payload: response?.data?.posts });
            setLoading(false);
        }
    }
}

export const getLikedPostsFn = (setLoading) => async (dispatch) => {
    const url = "post/likedposts";
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_LIKED_POST_SUCCESS", payload: response?.data?.posts });
            setLoading(false);
        }
    }
}

export const likePostFn = (postId, userId) => async (dispatch) => {
    const url = `post/like/${postId}`;
    let response = {};
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        return false;
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LIKE_POST_SUCCESS", payload: { userId, liked: response?.data?.liked, postId } })
            return true;
        }
    }
}
export const savePostFn = (postId) => async (dispatch) => {
    const url = `post/save/${postId}`;
    let response = {};
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        return false;
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "SAVE_POST_SUCCESS", payload: { saved: response?.data?.liked, postId } })
            return true;
        }
    }
}
export const getUserPostsFn = (userId  , setLoading) => async (dispatch) => {
    const url = `post/all/${userId}`;
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            setLoading(false)
            return response.data?.posts;
        }
    }
}

export const fetchPostById = (postId) => async (dispatch) => {
    const url = `/post/${postId}`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            return response?.data?.post;
        }
    }
}
export const updatePostFn = (postId, data, setErrorMsg) => async (dispatch) => {
    const url = `/post/${postId}`;
    let response = {};
    try {
        response = await instance.patch(url, data);
    } catch (error) {
        setErrorMsg(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            toast.success("Post Updated Sucessfully");
        }
    }
}

export const deletePostFn = (postId, setErrorMsg) => async (dispatch) => {
    dispatch({ type: "DELETE_POST_SUCCESS", payload: postId });
    const url = `/post/${postId}`;
    try {
        await instance.delete(url);
    } catch (error) {
        setErrorMsg(error.response.data.msg);
        window.location.reload();
    }
}
