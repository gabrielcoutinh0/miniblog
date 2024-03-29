import styles from "./Tag.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useParams, Link } from "react-router-dom";
import PostDetail from "../LastPosts/LastPosts";
import firebase from "firebase/firestore";
import { useEffect } from "react";

export default function Tag() {
  const { id } = useParams();
  const { documents: posts }: firebase.DocumentData = useFetchDocuments(
    "posts",
    id
  );

  return (
    <div className={`content ${styles.tag}`}>
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
          posts.map((post: firebase.DocumentData, key: string) => (
            <PostDetail key={key} post={post} />
          ))}
      </div>
    </div>
  );
}
