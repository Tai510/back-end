const router = require('express').Router();
const db = require('./data/dbConfig.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
   }

router.get("/random",  (req, res) => {
    db("random")
      .then(async random => {
             let id = getRandomInt(random.length)+1;
             let response = await db('random').where({'users_id': id })
    res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  

  router.get("/random/:id", (req, res) => {
    console.log('yes')
    db("random")
      .where({ id: req.params.id })
      .first()
      .then(random => {
        if (random) {
          res.status(200).json(random);
        } else {
          res.status(404).json({ message: "no such contact yet" });
        }
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
           console.log(req.body)
       })
       .catch(error => {
           res.status(500).json({ message: 'Internal server error'})
       })
})

module.exports = router;