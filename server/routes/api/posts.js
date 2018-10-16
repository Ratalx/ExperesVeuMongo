const express = require('express');
const mongodb =  require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add Posts

router.post('/',async (req,res) => {
    const post = await loadPostsCollection();
    await post.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

//Delete Posts
router.delete('/:id',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://vueTest123:VuePad110@ds131743.mlab.com:31743/veu_express',
    {
        useNewUrlParser: true
    }
    );
    
    return client.db('veu_express').collection('posts');
}

module.exports = router;