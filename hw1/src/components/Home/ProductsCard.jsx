import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addItemToCart } from "../../redux/actions/cartActions";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const { isLogin } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  function addProductHandler() {
    if (product.instock === 0) return;
    dispatch(addItemToCart(product, 1));
  }

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} widht="100" height="100" />
        <p>{product.title}</p>
        <p>price: {product.price}$</p>
      </Link>
      {/* <button
        onClick={addProductHandler}
        disabled={+product.instock === 0 || !isLogin}
      >
        {isLogin ? (
          <>{+product.instock === 0 ? "out of stock" : "Add to Cart"}</>
        ) : (
          <>please login</>
        )} */}
      <button onClick={addProductHandler} disabled={!isLogin}>
        {isLogin ? "Add to Cart" : "please login"}
      </button>
    </div>
  );
}

export default ProductCard;
