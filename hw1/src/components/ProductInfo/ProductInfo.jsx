import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchProductById } from "../../api/product";

import BuyForm from "./BuyForm";
import ProductDescriptionEditable from "./ProductDescriptionEditable";

import styles from "./ProductInfo.module.css";

function ProductInfo({ logInfo, onBuyProduct, lastUpdated, onUpdateInfo }) {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  function submitHandler(amount) {
    onBuyProduct(product, amount);
    setProduct((prevState) => ({
      ...prevState,
      instock: prevState.instock - amount,
    }));
  }

  return (
    <div className={styles.productInfo}>
      {product ? (
        <>
          <ProductDescriptionEditable
            product={product}
            onUpdateInfo={onUpdateInfo}
            role={logInfo.role}
            isLogin={logInfo.login}
            setProduct={setProduct}
          />
          {logInfo.login ? (
            <BuyForm max={product.instock} onBuy={submitHandler} />
          ) : (
            <p>please log in</p>
          )}
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default ProductInfo;
