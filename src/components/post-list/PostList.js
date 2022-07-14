import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import PostItem from "./post-item/PostItem";

import "./PostList.scss";

const PostList = () => {
    // constants
    const posts = useSelector((state) => state.posts.posts);
    const navigate = useNavigate();

    // methods
    const hanleClick = (id) => {
        navigate(`/post/${id}`);
    };

    const renderPosts = () => {
        return posts.map((post) => (
            <PostItem
                key={post.id}
                {...post}
                ellipsis={true}
                handleClick={hanleClick}
            />
        ));
    };

    return <div className='post-list-container flex jcsb'>{renderPosts()}</div>;
};

export default PostList;
