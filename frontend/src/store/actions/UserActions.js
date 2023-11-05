import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";
import { formatErrorMessage } from "../../utils/formatError";


export const loadUserFn = (navigate) => async (dispatch) => {
    const url = `/user/profile`;
    let response = {};
    try {
        response = await instance.get(url);
        console.log(response);
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAILURE" });
        navigate("/login");
        if (error?.response?.data?.msg === "UNAUTHORIZED") {
            toast.error("Please login");
        }  else {
            toast.error("Please wait for 15 seconds to let the server start as it is hosted in a free server");
        }
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response.data?.user });
            dispatch({ type: "LOGGED_IN", payload: response.data?.user._id });
        }
    }
}

export const editProfileFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    const url = "/user/profile";
    let response = {};
    try {
        response = await instance.patch(url, data);
    } catch (error) {
        setErrorMsg(formatErrorMessage(error?.response?.data?.msg));
        navigate("/")
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "EDIT_PROFILE_SUCCESS", payload: response.data?.user });
        }
    }
}

export const fetchFollowersFn = (id, setLoading) => async (dispatch) => {
    const url = `user/followers/${id}`;
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(formatErrorMessage(error.message || "Cannot fetch followings"));
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            setLoading(false);
            return response.data?.followers;
        }
    }
}

export const fetchFollowingsFn = (id, setLoading) => async (dispatch) => {
    const url = `user/followings/${id}`;
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(formatErrorMessage(error.message || "Cannot fetch followings"));
        setLoading(false);
    } finally {
        if (response?.status === 200) {
            setLoading(false);
            return response.data?.followings;
        }
    }
}

export const fetchSuggestedUsersFn = (setLoading) => async (dispatch) => {
    const url = "/user/suggesteduser";
    let response = {};
    setLoading(true);
    try {
        response = await instance.get(url);
    } catch (error) {
        setLoading(false);
        return [];
    } finally {
        if (response?.status === 200) {
            setLoading(false);
            return response?.data?.users;
        }
    }
};

export const fetchSearchedUsersFn = (query, setUsers) => async (dispatch) => {
    dispatch({ type: "FETCH_SEARCHED_USERS_REQUEST" });
    const url = `/user/search?query=${query}`;
    let response = {};

    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "FETCH_SEARCHED_USERS_FAILURE" });
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "FETCH_SEARCHED_USERS_SUCCESS", payload: response.data?.users });
            setUsers(response.data?.users);
            return response.data?.followers;
        }
    }
}

export const getUserProfileFn = (id) => async (dispatch) => {
    const url = `user/${id}`;
    let response = {};

    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(formatErrorMessage(error.message || error.response.data?.msg));
    } finally {
        if (response?.status === 200) {
            return response.data?.user;
        }
    }
}

export const followUnfollowUserFn = (id) => async (dispatch) => {
    const url = `/user/followUnfollow/${id}`;
    let response = {};

    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(formatErrorMessage(error.message || error.response.data?.msg));
        return false;
    } finally {
        if (response?.status === 200) {
            if(response?.data?.followed){
                dispatch({ type: "FOLLOW_USER_SUCCESS", payload: id });
            }else{
                dispatch({ type: "UNFOLLOW_USER_SUCCESS", payload: id });
            }
            return true;
        }
    }
}

export const uploadImage = (image) => async (dispatch) => {
    console.log(image);
    try {
        if (!image) {
            return true;
        } else if (image.size > 1050000) {
            toast.error("Image size must be less than 1 mb");
            return;
        }
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "pijjaApp");
        data.append("cloud_name", "amitkumarshaw");

        const url = 'https://api.cloudinary.com/v1_1/amitkumarshaw/image/upload';
        const res = await fetch(url, {
            method: "POST",
            body: data
        });
        const json = await res.json();
        if (res.status === 200) {
            return json;
        } else {
            toast.error("Can't upload image please try again later");
        }
        // console.log(json);
    } catch (error) {
        toast.error("Can't upload image please try again later")
    }
}