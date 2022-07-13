import { useSelector } from "react-redux";
import PostItem from "./post-item/PostItem";

import "./PostList.scss";

const PostList = () => {
    // constants
    const posts = useSelector((state) => state.posts.posts);

    // methods
    const renderPosts = () => {
        return posts.map((post) => (
            <PostItem key={post.id} {...post} ellipsis={true} />
        ));
    };

    return <div className='post-list-container flex'>{renderPosts()}</div>;
};

export default PostList;
