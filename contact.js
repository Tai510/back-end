
const router = require('express').Router();
const db = require('./data/dbConfig.js');

router.get("/contacts", (req, res) => {
    db("contacts")
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.post('/contacts', (req, res) => {
   db('contacts')
       .insert(req.body)
       .then(result => {
           res.json(result)
       })
       .catch(error => {
           res.status(500).json({ message: 'Internal server error'})
       })
})

router.get("/contacts/:id", (req, res) => {
    console.log('yes')
    db("contacts")
      .where({ id: req.params.id })
      .first()
      .then(contacts => {
        if (contacts) {
          res.status(200).json(contacts);
        } else {
          res.status(404).json({ message: "no such contact yet" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.put("/contacts/:id", (req, res) => {
    db("contacts")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? "contact" : "contact"} updated`
          });
        } else {
          res.status(400).json({ message: "no such contact exists" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.delete("/contacts/:id", (req, res) => {
    const contactid = req.params.id;
    db("contacts")
      .where({ id: contactid })
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? "records" : "record"} deleted`
          });
        } else {
          res.status(400).json({ message: "No such contacts exists" });
        }
      })
   
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
   });


  module.exports = router;