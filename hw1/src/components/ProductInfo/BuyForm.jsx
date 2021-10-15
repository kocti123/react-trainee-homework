import { useState } from "react";

function BuyForm({ product, onBuy, max }) {
  const [buyAmount, setBuyAmount] = useState(1);

  function submitHandler(event) {
    event.preventDefault();
    onBuy(buyAmount);
  }

  function changeAmountHandler({ target: { value } }) {
    setBuyAmount(value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="number"
        min="1"
        max={max}
        value={buyAmount}
        onChange={changeAmountHandler}
      />
      <button type="submin" disabled={max === 0}>
        {max === 0 ? "out of stock" : "buy"}
      </button>
    </form>
  );
}

export default BuyForm;
