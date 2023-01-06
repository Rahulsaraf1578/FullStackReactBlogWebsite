// Form routing of specific article based on an id
import { useParams } from "react-router-dom";
import articles from "./Article-content";
import NotFound from "./NotFound";

const ArticlePage = () =>{
    const {articleId} = useParams();
    const article = articles.find(article => article.name ===articleId)

    if(!article){
        return <NotFound/>
    }

    return(
        <>
            <h1>{article.title}</h1>
            {article.content.map(paragraph =>(
                <p key={paragraph}>{paragraph}</p>
            ))}
        </>
        
    );
}

export default ArticlePage;