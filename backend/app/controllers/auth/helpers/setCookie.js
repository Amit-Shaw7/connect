export const setCookie = (res, token) => {
    res.cookie(String("connectToken"), token, {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
}