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
      <img src={imageUrl} alt="" />
      <h1>{name}</h1>
      <h1>R${value}</h1>
      <h1>Estoque: {quantity}</h1>
    </div>
  );
};

export default Product;
