import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/login/Login';
import MainLayout from './layouts/mainLayout/MainLayout';
import Home from './pages/home/Home';
import SavedPosts from './pages/savedPosts/SavedPosts';
import LikedPosts from './pages/likedPosts/LikedPosts';
import Profile from './pages/profile/Profile';
import "./App.css";
import Explore from './pages/explore/Explore';
import Page404 from './pages/errorPages/Page404';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Signup from './auth/signup/Signup';
import PostDetails from './pages/postDetails/PostDetails';
import MyPosts from './pages/myPosts/MyPosts';
import SearchPage from './pages/SearchPage';
import { Box, ThemeProvider } from '@mui/material';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

const App = () => {
  // const { savedPosts } = useSelector(state => state.post);
  const { mode } = useSelector(state => state.app);
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <Box bgcolor={"background.default"} color="text.primary" sx={{ minHeight: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="saved-posts" element={<SavedPosts />} />
              <Route path="liked-posts" element={<LikedPosts />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="user/:id" element={<Profile />} />
              <Route path="post/:id" element={<PostDetails />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
          <Toaster position="top-center" />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App