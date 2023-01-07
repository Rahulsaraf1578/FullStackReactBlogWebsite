import express from "express";
import {db,connectToDb} from "./db.js"

const app = express();
app.use(express.json());

// End point for getting articles data
app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;

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

app.put('/api/articles/:name/upvote',async (req,res)=>{
    const {name} = req.params;

    await db.collection('articles').updateOne({name},{
        // inc means increment
        $inc:{upvotes:1},
    });

    const article = await db.collection('articles').findOne({name})
    
    if(article){
        res.send(article)
    }else{
        res.send("That article doesnt exist");
    }
})

app.post('/api/articles/:name/comments',async(req,res)=>{
    const {name} = req.params;
    const {postedBy,text} = req.body;

    await db.collection('articles').updateOne({name},{
        // inc means increment
        $push:{comments:{postedBy,text}},
    });

    const article = await db.collection('articles').findOne({name})
    

    if(article){
        res.json(article.comments); 
    }else{
        req.send("This article does not exist");
    }
})

connectToDb(()=>{
    console.log("Successfully connected to database")
    app.listen(8000, ()=>{
        console.log('Server is listening to port 8000');
    })
})

