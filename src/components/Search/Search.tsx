import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";

export default function Search() {
  const query = useQuery();
  const search = query.get("q");
  const searchLowcase = search?.toLowerCase();

  const { documents: posts } = useFetchDocuments("posts", searchLowcase);

  return (
    <div className={styles.search}>
      <h2>Resultado da busca para: {searchLowcase}</h2>
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
          posts.map((post) => <PostDetail keyPost={post.id} post={post} />)}
      </div>
    </div>
  );
}
