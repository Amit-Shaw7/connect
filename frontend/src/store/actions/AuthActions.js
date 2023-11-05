import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";
import { formatErrorMessage } from "../../utils/formatError";

export const signupFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    const url = "/auth/register";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        setErrorMsg(formatErrorMessage(error?.response?.data?.msg));
    } finally {
        if (response?.status === 200) {
            navigate("/login");
            toast.success("Signup Succesfull");
        }
    }
}

export const loginFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    const url = "/auth/login";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        setErrorMsg(formatErrorMessage(error?.response?.data?.msg));
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.user?._id });
            navigate("/");
            toast.success("Logged in Succesfull");
        }
    }
}
export const loginAsGuestFn = (setErrorMsg, navigate) => async (dispatch) => {
    const url = "/auth/login";
    let response = {};
    const data ={
        email : "guest@gmail.com",
        password : "123456789"
    }
    try {
        response = await instance.post(url, data);
    } catch (error) {
        setErrorMsg(formatErrorMessage(error?.response?.data?.msg));
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.user?._id });
            navigate("/");
            toast.success("Logged in Succesfull");
        }
    }
}

export const logoutFn = (navigate) => async (dispatch) => {
    const url = "/auth/logout";
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error("Internal server error");
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOGOUT_SUCCESS" });
            dispatch({ type: "RESET_USER_STATE" });
            dispatch({ type: "RESET_STORY_STATE" });
            dispatch({ type: "RESET_POST_STATE" });
            dispatch({ type: "RESET_COMMENT_STATE" });
            navigate("/login");
            toast.success("Logged out Succesfully");
        }
    }
}

