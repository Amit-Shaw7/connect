const logout = (req, res, next) => {
    res.clearCookie(String("connectToken"), {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });
    return res.status(200).json({
        msg: "LOGOUT_SUCCESSFUL"
    });
}

export default logout;