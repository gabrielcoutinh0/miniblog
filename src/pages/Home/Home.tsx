import styles from "./Home.module.css";

import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";
import LastPosts from "../../components/LastPosts/LastPosts";

export default function Home() {
  const { documents: posts, loading } = useFetchDocuments("posts", false);
  const { documents: lastPosts, loadingLastPost } = useFetchDocuments(
    "posts",
    true
  );

  return (
    <div className={styles.home}>
      <h1>Destaques</h1>
      {loadingLastPost && <p>Carregando...</p>}
      <div className={styles.lastPosts}>
        {lastPosts &&
          lastPosts.map((post) =>
            post.tags.includes("destaque") ? (
              <LastPosts keyPost={post.id} post={post} />
            ) : (
              ""
            )
          )}
      </div>
      <div>
        {!posts && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
      <div className={styles.posts}>
        {posts && <h1>Últimos Posts</h1>}
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => <PostDetail keyPost={post.id} post={post} />)}
      </div>
    </div>
  );
}
