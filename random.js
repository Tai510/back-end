const router = require('express').Router();
const db = require('./data/dbConfig.js');

router.get("/random", (req, res) => {
    db("random")
      .then(random => {
        res.status(200).json(random);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.post('/random', (req, res) => {
   db('random')
       .insert(req.body)
       .then(result => {
           res.json(result)
       })
       .catch(error => {
           res.status(500).json({ message: 'Internal server error'})
       })
})

module.exports = router;