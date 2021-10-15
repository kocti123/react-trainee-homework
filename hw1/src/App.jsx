import { useState, useEffect } from "react";

import {
  fetchAllProduct,
  sentInfoAboutProduct,
  sentNewInstockInfo,
} from "./api/product";

import { Link, Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About";
import NotFoundPage from "./components/NotFoundPage";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";

import styles from "./App.module.css";

function App() {
  const path = useLocation();
  const [logInfo, setLogInfo] = useState({
    login: false,
    role: "none",
    name: "none",
  });
  const [products, setProducts] = useState();
  const [cart, setCart] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();

  useEffect(() => {
    if (path.pathname === "/") {
      fetchAllProduct().then(setProducts);
    }
  }, [path, lastUpdated]);

  function login(name, role = "customer") {
    setLogInfo({
      name,
      role,
      login: true,
    });
  }

  function logout() {
    setLogInfo({
      name: "none",
      role: "none",
      login: false,
    });
    setCart([]);
  }

  function buyProductHandler(product, amount) {
    setLastUpdated(Date.now());
    sentNewInstockInfo(product, amount);

    setCart((prevState) => [
      ...prevState,
      {
        id: product.id,
        price: product.price,
        amount: amount,
      },
    ]);
  }

  function updateInfoAboutProduct(newInfo) {
    setLastUpdated(Date.now());
    sentInfoAboutProduct(newInfo);
  }

  return (
    <div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/about">About </Link>
          </li>
        </ul>
        <Cart isLogin={logInfo.login} cartInfo={cart} />
        <Login onLogin={login} onLogout={logout} logInfo={logInfo} />
      </nav>

      <Switch>
        <Route exact path="/">
          <Home
            isLogin={logInfo.login}
            products={products}
            onAddProduct={buyProductHandler}
          />
        </Route>
        <Route path="/products/:id">
          <ProductInfo
            logInfo={logInfo}
            onBuyProduct={buyProductHandler}
            onUpdateInfo={updateInfoAboutProduct}
            lastUpdated={lastUpdated}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
