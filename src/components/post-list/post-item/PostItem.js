import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
// component styles
import "./PostItem.scss";

const defaultImageUrl =
    "https://m.media-amazon.com/images/M/MV5BNzZiYzQwMTQtNTc0MS00ODEwLWI2NzUtZDVhOTBlMDA1YmY2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg";

const PostItem = ({
    imageUrl,
    title,
    content,
    createdBy,
    id,
    ellipsis,
    handleClick,
}) => {
    // methods
    const handlePostClick = () => {
        handleClick && handleClick(id);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex post-item mb-2'
            onClick={handlePostClick}
        >
            <div className='post-image-container '>
                <img
                    className='post-image'
                    src={imageUrl ? imageUrl : defaultImageUrl}
                    alt={title}
                />
            </div>
            <div className='post-content p-4 h-100 w-100'>
                <h4 className={"post-title mb-3 " + (ellipsis && "emphasis")}>
                    {title}
                </h4>
                <div className={"post-content " + (ellipsis && "emphasis")}>
                    <p>{content}</p>
                </div>
                <div className='post-item-footer flex jcsb aic mt-4'>
                    <p className='read-more'>Read more</p>
                    <p>
                        by: <strong>{createdBy}</strong>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PostItem;
