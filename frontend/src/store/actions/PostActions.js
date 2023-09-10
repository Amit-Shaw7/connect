import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";
import { delay } from "../../utils/delay";

export const addPostFn = (data , dataToShow) => async (dispatch) => {
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
    dispatch({ type: "GET_MY_POST_REQUEST" });
    const url = `post/myposts?query=${type.toLowerCase()}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "GET_MY_POST_FAILURE" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_MY_POST_SUCCESS", payload: response.data?.posts });
        }
    }
}

export const getPostsForFeedFn = (type) => async (dispatch) => {
    // dispatch({ type: "START_LOADER" });
    const url = `post/feed?query=${type.toLowerCase()}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        // dispatch({ type: "STOP_LOADER" });
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_ALL_POST_SUCCESS", payload: response.data?.posts });
            // return response.data?.posts;
        }
    }
}

export const getPostsForExplorefn = (type) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `post/explore?query=${type.toLowerCase()}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "STOP_LOADER" });
            return response.data?.posts;
        }
    }
}


export const getSavedPostsFn = (type) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = "post/savedposts";
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_SAVED_POST_SUCCESS", payload: response?.data?.posts });
        }
    }
}
export const getLikedPostsFn = (type) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = "post/likedposts";
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "GET_LIKED_POST_SUCCESS", payload: response?.data?.posts });
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
export const getUserPostsFn = (userId) => async (dispatch) => {
    const url = `post/all/${userId}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            return response.data?.posts;
        }
    }
}

export const fetchPostById = (postId) => async (dispatch) => {
    const url = `/post/${postId}`;
    let response = {};
    await delay();
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
    await delay();
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
    const url = `/post/${postId}`;
    let response = {};
    await delay();
    try {
        response = await instance.delete(url);
    } catch (error) {
        setErrorMsg(error.response.data.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "DELETE_POST_SUCCESS", payload: postId });
            toast.success("Post Deleted Sucessfully");
        }
    }
}
