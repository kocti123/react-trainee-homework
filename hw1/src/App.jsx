import { Link, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import About from "./components/About";
import NotFoundPage from "./components/NotFoundPage";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";

import styles from "./App.module.css";

function App() {
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
        <Cart />
        <Login />
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:id">
          <ProductInfo />
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
