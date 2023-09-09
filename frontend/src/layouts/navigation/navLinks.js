import { PermMedia, PermMediaOutlined } from "@mui/icons-material";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import Explore from "@mui/icons-material/Explore";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import Home from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";


export const links = [
    {
        title: "Home",
        icon: <HomeOutlined color="primary" />,
        selectedIcon: <Home color="primary" />,
        path: "/",
    },
    {
        title: "Explore",
        icon: <ExploreOutlined color="primary" />,
        selectedIcon: <Explore color="primary" />,
        path: "/explore",
    },
    {
        title: "Saved Posts",
        icon: <BookmarkBorderOutlined color="primary" />,
        selectedIcon: <Bookmark color="primary" />,
        path: "/saved-posts",
    },
    {
        title: "Liked Posts",
        icon: <FavoriteBorderOutlined color="primary" />,
        selectedIcon: <Favorite color="primary" />,
        path: "/liked-posts",
    },
    {
        title: "My Posts",
        icon: <PermMediaOutlined color="primary" />,
        selectedIcon: <PermMedia color="primary" />,
        path: "/myposts",
    },
]