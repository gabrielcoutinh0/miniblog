import styles from "./Post.module.css";
import UserProfile from "../../assets/user-profile.svg";
import noImage from "../../assets/no-image.svg";
import { useState } from "react";
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

  const [imageError, setImageError] = useState(false);

  return (
    <div className="content">
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
              {post.tags.map(
                (tag: string) =>
                  !tag.includes("destaque") &&
                  !tag.includes("popular") && (
                    <span key={tag}>
                      <Link to={`/tag/${tag}`}>#{tag}</Link>
                    </span>
                  )
              )}
            </div>
          </div>
          {imageError ? (
            <img src={noImage} alt={post.title} className={styles.noImage} />
          ) : (
            <img
              src={post.image}
              alt={post.title}
              onError={() => setImageError(true)}
            />
          )}
          <div
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </main>
      )}
    </div>
  );
}
