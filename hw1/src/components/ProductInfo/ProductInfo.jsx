import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchAndSetProduct,
  clearProduct,
} from "../../redux/actions/productActions";

import BuyForm from "./BuyForm";
import EditProduct from "./EditProduct";
import Spinner from "../../UI/Spinner/Spinner";

import styles from "./ProductInfo.module.css";

function ProductInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLogin } = useSelector((store) => store.user);
  const { product } = useSelector((store) => store.product);
  const { isEdit } = useSelector((store) => store.productEditForm);

  useEffect(() => {
    dispatch(fetchAndSetProduct(id));
    return () => {
      dispatch(clearProduct());
    };
  }, [id, dispatch]);

  return (
    <div className={styles.productInfo}>
      {product?.id ? (
        <>
          <img src={product.image} alt={product.title} />
          {isEdit ? undefined : (
            <>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>{product.price}$</p>
              {isLogin ? <BuyForm /> : <p>please log in</p>}
            </>
          )}
          {isLogin ? <EditProduct /> : undefined}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default ProductInfo;
