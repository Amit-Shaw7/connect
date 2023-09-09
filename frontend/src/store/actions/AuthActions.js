import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";

export const signupFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    const url = "/auth/register";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        dispatch({ type: "SIGNUP_FAILURE" });
        setErrorMsg(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "SIGNUP_SUCCESS" });
            navigate("/login");
            toast.success("Signup Succesfull");
        }
    }
}

export const loginFn = (data, setErrorMsg, navigate) => async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    const url = "/auth/login";
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE" });
        setErrorMsg(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: response?.data?.user?._id });
            navigate("/");
            toast.success("Logged in Succesfull");
        }
    }
}

export const logoutFn = (navigate) => async (dispatch) => {
    dispatch({ type: "LOGOUT_REQUEST" });
    const url = "/auth/logout";
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "LOGGED_FAILURE" });
        toast.error("Internal server error");
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "LOGOUT_SUCCESS" });
            navigate("/login");
            toast.success("Logged out Succesfully");
        }
    }
}

