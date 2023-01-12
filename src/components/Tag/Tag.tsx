import styles from "./Tag.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useParams, Link } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";
import firebase from "firebase/firestore";

export default function Tag() {
  const { id } = useParams();
  const { documents: posts }: firebase.DocumentData = useFetchDocuments(
    "posts",
    id
  );

  return (
    <div className={styles.tag}>
      <h2>{id?.toUpperCase()}</h2>
      <div className={styles.posts}>
        {posts && posts.length === 0 && (
          <>
            <p>Tag não encontrada</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post: firebase.DocumentData) => (
            <PostDetail keyPost={post.id} post={post} />
          ))}
      </div>
    </div>
  );
}
