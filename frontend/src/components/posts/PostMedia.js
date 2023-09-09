import React from 'react'
import Image from '../image/Image'

const PostMedia = ({post}) => {
    return (
        <Image
            src={post?.media}
            height="max-content"
            maxHeight="400px"
            width="100%"
            fit="contain"
        />
    )
}

export default PostMedia