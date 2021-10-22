import styles from "./Cart.module.css";

function Cart({ isLogin, cartInfo }) {
  const priceOfProducts = cartInfo.reduce(
    (acc, prod) => acc + prod.price * prod.amount,
    0
  );
  const numOfProducts = cartInfo.reduce((acc, prod) => acc + +prod.amount, 0);
  return isLogin ? (
    <p className={styles.cart}>
      В корзине {numOfProducts} товаров на сумму {priceOfProducts}
    </p>
  ) : (
    <div></div>
  );
}

export default Cart;
