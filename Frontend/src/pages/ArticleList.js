import { Link } from "react-router-dom";
import ArticlesList from "../components/ArticlesList";
import articles from "./Article-content";

const ArticleListPage = () =>{
    return(
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles}/>
        </>
    );
}

export default ArticleListPage;