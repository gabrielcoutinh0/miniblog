import styles from "./About.module.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={`content ${styles.about}`}>
      <h2>
        Sobre o Mini<strong>Blog</strong>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no front-end e Firebase
        no back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
}
