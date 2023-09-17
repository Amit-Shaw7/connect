import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";
// import { delay } from "../../utils/delay";


export const loadUserFn = (userId, navigate) => async (dispatch) => {
    dispatch({ type: "LOAD_USER_REQUEST" });
    const url = `/user/profile`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAILURE" });
        navigate("/login");
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: response.data?.user });
            dispatch({ type: "LOGGED_IN", payload: response.data?.user._id });
        }
    }
}

export const editProfileFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    console.log("Clicked");
    dispatch({ type: "EDIT_PROFILE_REQUEST" });
    const url = "/user/profile";
    let response = {};
    try {
        response = await instance.patch(url, data);
    } catch (error) {
        dispatch({ type: "EDIT_PROFILE_FAILURE" });
        setErrorMsg(error?.response?.data?.msg);
        navigate("/")
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "EDIT_PROFILE_SUCCESS", payload: response.data?.user });
        }
    }
}

export const fetchFollowingsFn = (id) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `user/followings/${id}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error.message || "Cannot fetch followings")
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "STOP_LOADER" });
            return response.data?.followings;
        }
    }
}
export const fetchFollowersFn = (id) => async (dispatch) => {
    dispatch({ type: "START_LOADER" });
    const url = `user/followers/${id}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "STOP_LOADER" });
        toast.error(error.message || "Cannot fetch followings")
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "STOP_LOADER" });
            return response.data?.followers;
        }
    }
}

export const fetchSuggestedUsersFn = () => async (dispatch) => {
    const url = "/user/suggesteduser";
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
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
    dispatch({ type: "FETCH_USER_REQUEST" });
    const url = `user/${id}`;
    let response = {};
   
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error.message);
    } finally {
        if (response?.status === 200) {
            return response.data?.user;
        }
    }
}

export const followUserFn = (id) => async (dispatch) => {
    const url = `/user/follow/${id}`;
    let response = {};
   
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.message);
        return false;
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "FOLLOW_USER_SUCCESS", payload: id });
            return true;
        }
    }
}
export const unfollowUserFn = (id) => async (dispatch) => {
    const url = `/user/unfollow/${id}`;
    let response = {};
   
    try {
        response = await instance.patch(url);
    } catch (error) {
        toast.error(error.message);
        return false;
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "UNFOLLOW_USER_SUCCESS", payload: id });
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

        dispatch({ type: "UPLOAD_PHOTO_REQUEST" });

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
            dispatch({ type: "UPLOAD_PHOTO_SUCCESS" });
            return json;
        } else {
            toast.error("Can't upload image please try again later");
        }
        // console.log(json);
    } catch (error) {
        dispatch({ type: "UPLOAD_PHOTO_FAILURE" });
        toast.error("Can't upload image please try again later")
    }
}