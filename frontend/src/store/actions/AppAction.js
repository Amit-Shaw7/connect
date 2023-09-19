export const toggleMode = (mode) => async (dispatch) => {
    localStorage.setItem("mode", mode);
    dispatch({ type: "TOGGLE_MODE" });
}