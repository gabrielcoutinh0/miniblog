import styles from "./Home.module.css";

import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import LastPosts from "../../components/LastPosts/LastPosts";
import HighlightsPosts from "../../components/HighlightsPosts/HighlightsPosts";

import firebase from "firebase/firestore";

export default function Home() {
  const { documents: lastPosts, loading }: firebase.DocumentData =
    useFetchDocuments("posts");
  const { documents: highlightsPosts }: firebase.DocumentData =
    useFetchDocuments("posts", "destaque", null, true, 5);

  return (
    <>
      <div className="content">
        <h1 className={styles.title}>Destaques</h1>
        {loading && <p>Carregando...</p>}
        <div className={styles.highlightsPosts}>
          {highlightsPosts &&
            highlightsPosts.map((post: firebase.DocumentData, key: string) => (
              <HighlightsPosts key={key} post={post} />
            ))}
        </div>

        {!lastPosts && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
      <div className={styles.col}>
        <main className={`content ${styles.lastPosts}`}>
          {lastPosts && <h1 className={styles.title}>Últimos Posts</h1>}
          <div className={styles.posts}>
            {loading && <p>Carregando...</p>}
            {lastPosts &&
              lastPosts.map((post: firebase.DocumentData, key: string) => (
                <LastPosts key={key} post={post} />
              ))}
          </div>
        </main>
        <aside className={`content ${styles.aside}`}></aside>
      </div>
    </>
  );
}
