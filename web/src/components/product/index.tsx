import styles from "./Product.module.css";

interface ProductProps {
  imageUrl: string;
  name: string;
  value: number;
  quantity: number;
}

const Product = ({ name, imageUrl, value, quantity }: ProductProps) => {
  return (
    <div className={styles.card}>
      <div id={styles.imgContainer}>
        <img src={imageUrl} alt="" />
      </div>
      <h1>{name}</h1>
      <h2>R${value}</h2>
      <p>Estoque: {quantity}</p>
    </div>
  );
};

export default Product;
