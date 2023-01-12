import styles from "./PostDetail.module.css";
import UserProfile from "../../assets/user-profile.svg";
import { Link } from "react-router-dom";
import { timeConverter } from "../../utils/TimeConverter";

export default function PostDetail({
  keyPost,
  post,
}: {
  keyPost: string;
  post: any;
}) {
  return (
    <article key={keyPost} className={styles.post}>
      <div className={styles.postImage}>
        <Link to={`/posts/${post.id}`}>
          <img src={post.image} alt={post.title} />
        </Link>
      </div>
      <div className={styles.postDetails}>
        <div className={styles.tags}>
          {post.tags.map((tag: string) =>
            tag.includes("destaque") ? (
              ""
            ) : (
              <span key={tag}>
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </span>
            )
          )}
        </div>
        <h2 className={styles.postTitle}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <p className={styles.postSnippet}>{post.resume}</p>
        <div className={styles.postMeta}>
          <div className={styles.postAuthAndTimestamp}>
            <span className={styles.authorImage}>
              <img src={UserProfile} alt="User Profile" />
            </span>
            <span className={styles.postAuthorAndData}>
              <span className={styles.postAuthor}>{post.createdBy}</span>
              <span className={styles.postDate}>
                <span>{timeConverter(post.createdAt.seconds)}</span>
              </span>
            </span>
          </div>
          <span>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">
              Continue lendo
            </Link>
          </span>
        </div>
      </div>
    </article>
  );
}
