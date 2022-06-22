import "./App.css";
import { useSelector } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Login, ProductDetail, Purchases, UserLogged } from "./pages";
import { LoadingPin, NavBar, ProtectedRoutes } from "./components";

function App() {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <div className="App">
        {isLoading && <LoadingPin />}
        <header className="content head">
          <NavBar />
        </header>
        <main className="content main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/userlogged" element={<UserLogged />} />
            </Route>
          </Routes>
        </main>
        <footer className="content foot">
          <section className="foot-section">
            <ul className="section-items">
              <li>
                <h3 className="item-title">Information</h3>
              </li>
              <li>Ecuador</li>
            </ul>
            <ul className="section-items">
              <li>
                <h3 className="item-title">About Us</h3>
              </li>
              <li className="item-info">Support Center</li>
              <li className="item-info">Customer Support</li>
              <li className="item-info">Copy Right</li>
            </ul>
            <ul className="section-items">
              <li>
                <h3 className="item-title">Social</h3>
              </li>
              <li className="item-social">
                <a
                  className="social-icons"
                  href="https://twitter.com/fernandomalan96"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  className="social-icons"
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  className="social-icons"
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </li>
            </ul>
          </section>
          <p className="foot-copy">© U-commerce, Inc.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
