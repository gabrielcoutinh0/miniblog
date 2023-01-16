import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";

import firebase from "firebase/firestore";
import { useEffect } from "react";

export default function Search() {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts }: firebase.DocumentData = useFetchDocuments(
    "posts",
    search
  );

  return (
    <div className={styles.search}>
      <h2>Resultado da busca para: {search?.toUpperCase()}</h2>
      <div className={styles.posts}>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
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
