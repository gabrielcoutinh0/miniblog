import styles from "./Home.module.css";

import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";
import LastPosts from "../../components/LastPosts/LastPosts";

import firebase from "firebase/firestore";

export default function Home() {
  const { documents: posts, loading }: firebase.DocumentData =
    useFetchDocuments("posts");
  const { documents: lastPosts }: firebase.DocumentData = useFetchDocuments(
    "posts",
    "destaque",
    null,
    true,
    5
  );

  return (
    <div className={styles.home}>
      <h1>Destaques</h1>
      {loading && <p>Carregando...</p>}
      <div className={styles.lastPosts}>
        {lastPosts &&
          lastPosts.map((post: firebase.DocumentData, key: string) => (
            <LastPosts key={key} post={post} />
          ))}
      </div>
      {!posts && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      )}
      {posts && <h1>Últimos Posts</h1>}
      <div className={styles.posts}>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post: firebase.DocumentData, key: string) => (
            <PostDetail key={key} post={post} />
          ))}
      </div>
    </div>
  );
}
