// Form routing of specific article based on an id
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./Article-content";
import NotFound from "./NotFound";

const ArticlePage = () =>{
    const [ArticleInfo,setArticleInfo] = useState({upvotes:0,comments:[]});

    useEffect(()=>{
        setArticleInfo({upvotes:3,commments:[]});
    });

    const {articleId} = useParams();
    const article = articles.find(article => article.name ===articleId)

    if(!article){
        return <NotFound/>
    }

    return(
        <>
            <h1>{article.title}</h1>
            <p>This article has {ArticleInfo.upvotes} and upvote(s) </p>
            {article.content.map(paragraph =>(
                <p key={paragraph}>{paragraph}</p>
            ))}
        </>
        
    );
}

export default ArticlePage;