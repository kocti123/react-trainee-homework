import styles from "./CartCard.module.css";

function CartCard({ product: { title, image, price, amount, id } }) {
  return (
    <div className={styles.cart}>
      {id ? (
        <>
          <img src={image} alt={title} className={styles.cartImage} />
          <p className={styles.cartTitle}>{title}</p>
          <p className={styles.cartPrice}>Total: {+price * +amount}$</p>
          <p className={styles.cartAmount}>Amount: {amount}</p>
        </>
      ) : undefined}
    </div>
  );
}

export default CartCard;
