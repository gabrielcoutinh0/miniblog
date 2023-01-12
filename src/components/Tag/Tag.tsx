import styles from "./Tag.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useParams, Link } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";

export default function Tag() {
  const tag = useParams();
  const { documents: posts } = useFetchDocuments("posts", tag.id);

  return (
    <div className={styles.tag}>
      <h2>{tag.id?.toUpperCase()}</h2>
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
          posts.map((post) => <PostDetail keyPost={post.id} post={post} />)}
      </div>
    </div>
  );
}
