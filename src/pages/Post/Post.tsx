import styles from "./Post.module.css";
import UserProfile from "../../assets/user-profile.svg";
import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { timeConverter } from "../../utils/TimeConverter";
import firebase from "firebase/firestore";

export default function Post() {
  const { id } = useParams();
  const { document: post, loading }: firebase.DocumentData = useFetchDocument(
    "posts",
    id
  );

  return (
    <div className={styles.Post}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <main className={styles.layoutPost}>
          <h1>{post.title}</h1>
          <p>{post.resume}</p>
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
            <div className={styles.tags}>
              {post.tags.map((tag: string) =>
                tag.includes("destaque") ? (
                  ""
                ) : (
                  <span key={tag}>
                    <Link to={`/tag/${tag}`}>#{tag}</Link>
                  </span>
                )
              )}
            </div>
          </div>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
        </main>
      )}
    </div>
  );
}
