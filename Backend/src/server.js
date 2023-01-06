import express from "express";

let articlesInfo = [{
    name:'learn-react',
    upvotes:0,
    comments:[],
},{
    name:'learn-node',
    upvotes:0,
    comments:[],
},{
    name:'learn-mongodb',
    upvotes:0,
    comments:[],
}]

const app = express();
app.use(express.json());

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