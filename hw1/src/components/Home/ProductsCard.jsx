import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ info, onAddProduct, isLogin }) {
  function addProductHandler() {
    if (info.instock === 0) return;
    onAddProduct(info, 1);
  }

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${info.id}`}>
        <img src={info.image} alt={info.title} widht="100" height="100" />
        <p>{info.title}</p>
        <p>price: {info.price}$</p>
      </Link>
      <button
        onClick={addProductHandler}
        disabled={+info.instock === 0 || !isLogin}
      >
        {isLogin ? (
          <>{+info.instock === 0 ? "out of stock" : "Add to Cart"}</>
        ) : (
          <>please login</>
        )}
      </button>
    </div>
  );
}

export default ProductCard;
