import styles from "./LastPosts.module.css";
import { Link } from "react-router-dom";
import { timeConverter } from "../../utils/TimeConverter";

export default function LastPosts({
  keyPost,
  post,
}: {
  keyPost: string;
  post: any;
}) {
  return (
    <div key={keyPost} className={styles.lastPost_item}>
      <div className={styles.postImage}>
        <Link to={`/posts/${post.id}`}>
          <img src={post.image} alt={post.title} />
        </Link>
      </div>
      <div className={styles.postDetails}>
        <div className={styles.tags}>
          {post.tags.map((tag: string) =>
            tag.includes("destaque") ? "" : <span key={tag}>{tag}</span>
          )}
        </div>
        <h3 className={styles.postTitle}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <div className={styles.postMeta}>
          <span className={styles.postAuthor}>{post.createdBy}</span>
          <span className={styles.postDate}>
            <span>{timeConverter(post.createdAt.seconds)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
