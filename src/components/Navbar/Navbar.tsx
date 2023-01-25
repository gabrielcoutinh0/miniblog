import styles from "./Navbar.module.css";
import searchIcon from "../../assets/search.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useState, useRef } from "react";

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);
  console.log(ref);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setQuery("");
    const queryLowcase = query.toLowerCase();

    if (queryLowcase) {
      return navigate(`/search?q=${queryLowcase}`);
    }
  };

  const handleSearch = () => {
    if (ref.current !== null) ref.current.focus();

    setActive(!active);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <span className={styles.logo}>
          Mini<strong>Blog</strong>
        </span>
      </NavLink>
      <form onSubmit={handleSubmit} className={styles.search}>
        <input
          className={
            active
              ? `${styles.input_search} ${styles.active}`
              : `${styles.input_search}`
          }
          type="text"
          placeholder="Digite sua busca..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onBlur={() => setActive(!active)}
          ref={ref}
        />
        <span onClick={handleSearch} className={styles.btn_search}>
          <img src={searchIcon} alt="Buscar" />
        </span>
      </form>
      <ul className={`${styles.listLink} listLink`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Inicio
          </NavLink>
        </li>
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
