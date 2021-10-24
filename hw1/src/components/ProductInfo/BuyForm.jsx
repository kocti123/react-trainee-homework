import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItemToCart } from "../../redux/actions/cartActions";

function BuyForm() {
  const [buyAmount, setBuyAmount] = useState(1);
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { isEdit } = useSelector((store) => store.productEditForm);

  function submitHandler(event) {
    event.preventDefault();
    dispatch(addItemToCart(product, buyAmount));
  }

  function changeAmountHandler({ target: { value } }) {
    setBuyAmount(value);
  }

  return (
    <>
      {!isEdit ? (
        <form onSubmit={submitHandler}>
          {/* {product.instock !== 0 ? ( */}
          {/* <> */}
          <input
            type="number"
            min="1"
            // max={product.instock}
            value={buyAmount}
            onChange={changeAmountHandler}
          />
          <button type="submin">buy</button>
          {/* </> */}
          {/* ) : ( // <p>out of stock</p> */}
          {/* )} */}
        </form>
      ) : undefined}
    </>
  );
}

export default BuyForm;
