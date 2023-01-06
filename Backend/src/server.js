import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

// End point for getting articles data
app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    
    // Connecting this client with asynchronus 
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne({name});

    if(article){
        res.json(article);
    }else{
        res.sendStatus(404);
    }
})


// app.post('/hello',(req,res)=>{
//     console.log(req.body);
//     res.send(`Hello ${req.body.name} `);
// })

// app.get('/hello/:name',(req,res)=>{
//     // req.params will give us acess to all the parameters of the request
//     const name = req.params.name;
//     res.send(`Hello ${name}!!`)
// })

app.put('/api/articles/:name/upvote',(req,res)=>{
    const {name} = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if(article){
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes`)
    }else{
        res.send("That article doesnt exist");
    }
})

app.post('/api/articles/:name/comments',(req,res)=>{
    const {name} = req.params;
    const {postedBy,text} = req.body;
    const article = articlesInfo.find(a => a.name === name);
    if(article){
        article.comments.push({postedBy,text});
        res.send(article.comments); 
    }else{
        req.send("This article does not exist");
    }
})

app.listen(8000, ()=>{
    console.log('Server is listening to port 8000');
})