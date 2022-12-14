import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { About } from './hot-stocks/About';
import { Explore } from './hot-stocks/explore/Explore';
import { Portfolio } from './hot-stocks/portfolio/Portfolio';
import { Saved } from './hot-stocks/Saved';
import { Search } from './hot-stocks/Search';
import HotStocksNav from './Nav';

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function App() {
  return (
    <BrowserRouter basename={basename}>
      <HotStocksNav>
        <div className="container">
          <Routes>
            <Route path="search">
              <Route path="" element={<Search />}></Route>
            </Route>
            <Route path="saved">
              <Route path="" element={<Saved />}></Route>
            </Route>
            <Route path="/">
              <Route path="" element={<Explore />}></Route>
            </Route>
            <Route path="portfolio">
              <Route path="" element={<Portfolio />}></Route>
            </Route>
            <Route path="about">
              <Route path="" element={<About />}></Route>
            </Route>
            <Route
              path="*"
              element={
                <div className="container">
                  <div className="row">
                    <div id="alert">
                      <div></div>
                    </div>
                    <div className="offset-3 col-6">
                      <div className="shadow p-4 mt-4">
                        <h1>Uh oh...</h1>
                        <p>This page doesn't exist.</p>
                        <p>Why don't you return <Link to={`/`}>home</Link>, friend?</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </HotStocksNav>
    </BrowserRouter >
  );
}

export default App;
