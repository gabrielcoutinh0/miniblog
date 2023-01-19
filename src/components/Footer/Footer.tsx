import styles from "./Footer.module.css";
import noImage from "../../assets/no-image.svg";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import firebase from "firebase/firestore";
import Loading from "../Loading/Loading";
import { timeConverter } from "../../utils/TimeConverter";
import { useState } from "react";

export default function Footer() {
  const [imageError, setImageError] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const { documents: popular, loading }: firebase.DocumentData =
    useFetchDocuments("posts", "popular", null, true, 2);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <div className={`${styles.footer_colums} ${styles.section}`}>
          <div className={`${styles.widget} ${styles.Image}`}>
            <span className={styles.logo}>
              <Link to="/">
                Mini<strong>BLOG</strong>
              </Link>
            </span>
          </div>
          <div className={styles.widget}>
            <div className={styles.widget_heading}>
              <h3 className={styles.title}>Popular</h3>
            </div>
            <div className={styles.widget_content}>
              {loading && <Loading />}
              {popular &&
                popular.map((post: firebase.DocumentData, key: string) => (
                  <div key={key} className={styles.post_item}>
                    <div className={styles.postImage}>
                      <Link to={`/posts/${post.id}`}>
                        {imageError ? (
                          <img
                            src={noImage}
                            alt={post.title}
                            className={styles.noImage}
                          />
                        ) : (
                          <img
                            src={post.image}
                            alt={post.title}
                            onError={() => setImageError(true)}
                          />
                        )}
                      </Link>
                    </div>
                    <div>
                      <h3 className={styles.postTitle}>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                      </h3>
                      <span>{timeConverter(post.createdAt.seconds)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.widget}>
            <div className={styles.widget_heading}>
              <h3 className={styles.title}>Pages</h3>
            </div>
            <div className={styles.widget_content}>
              <ul className="listLink">
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/about">Sobre</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={` ${styles.section} ${styles.center}`}>
          <div>
            <h3>Escreva sobre o que você tem interesse!</h3>
            <p>MiniBlog &copy; {currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
