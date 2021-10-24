import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAndSetAllProducts } from "../../redux/actions/productsActions";

import ProductCard from "./ProductsCard";
import Spinner from "../../UI/Spinner/Spinner";

import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(fetchAndSetAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      {products.length !== 0 ? (
        <ul className={styles.shopList}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Home;
