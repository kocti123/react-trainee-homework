import { useSelector } from "react-redux";
import { useState } from "react";

import Modal from "../../UI/Modal/Modal";

import styles from "./Cart.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import CartCard from "./CartCard";

function Cart() {
  const [showCart, setShowCart] = useState(false);

  const { isLogin } = useSelector((store) => store.user);
  const { amount, products, cartLoaded } = useSelector((store) => store.cart);

  const closeCartHandler = () => {
    setShowCart(false);
  };

  const showCartHandler = () => {
    setShowCart(true);
  };

  return (
    <div>
      {isLogin ? (
        <>
          {cartLoaded ? (
            <p
              className={styles.cart}
              onClick={showCart ? closeCartHandler : showCartHandler}
            >
              В корзине {amount} товаров
            </p>
          ) : (
            <Spinner />
          )}
          <Modal show={showCart} onClose={closeCartHandler} title="your Cart">
            {Object.keys(products).length !== 0 ? (
              <>
                {products.map((product) => (
                  <CartCard key={product.id} product={product} />
                ))}
              </>
            ) : (
              <p>Nothing to see here! Go and buy something</p>
            )}
          </Modal>
        </>
      ) : undefined}
    </div>
  );
}

export default Cart;
