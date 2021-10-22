import ProductCard from "./ProductsCard";

import styles from "./Home.module.css";

function Home({ products, onAddProduct, isLogin }) {
  return (
    <div>
      <h1>Home</h1>
      {products ? (
        <ul className={styles.shopList}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              info={product}
              onAddProduct={onAddProduct}
              isLogin={isLogin}
            />
          ))}
        </ul>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default Home;
