import express from 'express';
import fs from 'fs';
import admin from 'firebase-admin';
import { db, connectToDb } from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
)

admin.initializeApp({
    credential:admin.credential.cret(credentials),
})

const app = express();
app.use(express.json());

// Using this middleware when user send it from frontend
// We are verifying that user with firebase credentials
// It is like when user sends headers with a api request
app.use(async (req,res,next)=>{
    const {authToken} = req.headers;

    if(authToken){
        try{
            req.user = await admin.auth().verifyIdToken();
        }catch(e){
            res.sendStatus(400);
        }
    }
    next();
})

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    // Getting user id from firebase
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds  = article.upvoteIds || [];
        // If user is not logged in he can't upvote
        // If he has already upvoted then he can't upvote
        article.canUpvote = uid && !upvoteIds.include(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

// If user is not logged in then they won't be ablt to make request to below end points
app.use((req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIds  = article.upvoteIds || [];
        // If user is not logged in he can't upvote
        // If he has already upvoted then he can't upvote
        const canUpvote = uid && !upvoteIds.include(uid);

        if(canUpvote){
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push:{upvoteIds:uid}
            });
        }
   
        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.send('That article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy:email, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})