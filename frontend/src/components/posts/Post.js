import { Card } from '@mui/material';
import React, { useState } from 'react';
import PostOwner from './PostOwner';
import PostTitle from './PostTitle';
import PostMedia from './PostMedia';
import PostActions from './PostActions';
import CustomCard from '../customCard/CustomCard';


const Post = ({ editable, user, post }) => {
    const [postText, setPostText] = useState(post?.postText);
    const handlePostText = (data) => {
        setPostText(data);
    }
    return (
        <>
            {post &&
                <CustomCard>
                    <PostOwner handlePostText={handlePostText} editable={editable} post={post} />
                    <PostTitle postText={postText} />
                    <PostMedia post={post} />
                    <PostActions user={user} post={post} />
                </CustomCard>
            }
        </>
    )
}

export default Post