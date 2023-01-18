import { ProductProps } from "../../services/types";
import styles from "./Product.module.css";

export default function Product({
  produto,
  loja,
  preco,
  link,
  imagem,
  obs,
  categoria,
}: ProductProps) {
  return (
    <div className={styles.product}>
      <a href={link} target="_blank">
        <img
          src={`https://pudim2.economizzando.com.br${imagem}`}
          alt={produto}
        />
      </a>
      <div className={styles.offerDetails}>
        <a href={link} target="_blank">
          <h3>{produto}</h3>
        </a>
        <div className={styles.categoryAndStore}>
          <small className={styles.category}>{categoria}</small>
          <span>{loja}</span>
        </div>
        <small className={styles.price}>{preco}</small>
        <p>{obs}</p>
        <a href={link} target="_blank" className={styles.btnOffer}>
          Ir para oferta
        </a>
      </div>
    </div>
  );
}
