import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <span className={styles.logo}>
          Mini<strong>Blog</strong>
        </span>
      </NavLink>
      <ul className={styles.listLink}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Cadastrar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
