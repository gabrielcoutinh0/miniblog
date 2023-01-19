// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from "./Home.module.css";

import { useState } from "react";

import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import LastPosts from "../../components/LastPosts/LastPosts";
import HighlightsPosts from "../../components/HighlightsPosts/HighlightsPosts";

import firebase from "firebase/firestore";
import Loading from "../../components/Loading/Loading";
import { useFetch } from "../../hooks/useFetch";
import Product from "../../components/Product/Product";
import { ProductProps } from "../../services/types";

export default function Home() {
  const [next, setNext] = useState(1);

  const { documents: lastPosts, loading }: firebase.DocumentData =
    useFetchDocuments("posts");
  const { documents: highlightsPosts }: firebase.DocumentData =
    useFetchDocuments("posts", "destaque", null, true, 5);

  const url = `https://pudim2.economizzando.com.br/conteudo/api/vitrine/desconto-em-games/?page=${next}`;

  const { data: products, loading: loadingProduts } = useFetch(url);

  console.log(products);

  return (
    <>
      <div className="content">
        <h1 className={styles.title}>Destaques</h1>
        {loading && <Loading />}
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
            {loading && <Loading />}
            {lastPosts &&
              lastPosts.map((post: firebase.DocumentData, key: string) => (
                <LastPosts key={key} post={post} />
              ))}
          </div>
        </main>
        <aside className={`content ${styles.aside}`}>
          <h1 className={styles.title}>Ofertas</h1>
          {loadingProduts ? (
            <Loading />
          ) : (
            <div className={styles.offers}>
              {products &&
                products.map(
                  ({
                    id,
                    loja,
                    produto,
                    preco,
                    link,
                    imagem,
                    obs,
                    categoria,
                  }: ProductProps) => (
                    <Product
                      key={id}
                      id={id}
                      loja={loja}
                      produto={produto}
                      preco={preco}
                      link={link}
                      imagem={imagem}
                      obs={obs}
                      categoria={categoria.toUpperCase()}
                    />
                  )
                )}
              {next < products?.length && (
                <button
                  className={styles.moreOffer}
                  onClick={() => setNext(next + 1)}
                >
                  Mais Ofertas
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
