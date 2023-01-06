import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./Navbar";
import Home from './pages/Home';
import About from './pages/About';
import ArticlesList from './pages/ArticleList';
import Article from './pages/ArticlePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path ="/articles/:articleId" element={<Article />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;