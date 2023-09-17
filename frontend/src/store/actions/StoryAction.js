import { toast } from "react-hot-toast";
import instance from "../../utils/axiosInstance";
import { delay } from "../../utils/delay";


export const fetchStoriesFn = () => async (dispatch) => {
    dispatch({ type: "FETCH_STORIES_REQUEST" });
    const url = `/story/all`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        dispatch({ type: "FETCH_STORIES_FAILURE" });
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "FETCH_STORIES_SUCCESS", payload: response.data?.stories });
        }
    }
}

export const fetchMyStory = () => async (dispatch) => {
    const url = `/story`;
    let response = {};
    try {
        response = await instance.get(url);
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "FETCH_MY_STORY", payload: response.data?.story });
        }
    }
}
export const addStory = (data, setErrorMsg, setLoading) => async (dispatch) => {
    setLoading(true);
    dispatch({ type: "ADD_STORY_REQUEST" });
    const url = `/story`;
    let response = {};
    try {
        response = await instance.post(url, data);
    } catch (error) {
        dispatch({ type: "ADD_STORY_FAILURE" });
        setLoading(false);
        setErrorMsg(error?.response?.data?.msg);
        toast.error(error?.response?.data?.msg);
    } finally {
        if (response?.status === 200) {
            dispatch({ type: "ADD_STORY_SUCCESS", payload: response.data?.story });
            setLoading(false);
        }
    }
}