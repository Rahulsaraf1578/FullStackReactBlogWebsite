import express from "express";

const app = express();
app.use(express.json());

app.post('/hello',(req,res)=>{
    console.log(req.body);
    res.send(`Hello ${req.body.name} `);
})

app.get('/hello/:name/goodbye/:otherName',(req,res)=>{
    // req.params will give us acess to all the parameters of the request
    console.log(req.params)
    const name = req.params.name;
    res.send(`Hello ${name}!!`)
})

app.listen(8000, ()=>{
    console.log('Server is listening to port 8000');
})