const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenService = require('../auth/token-service.js');

const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService.generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!, have a token...`,
            token,
            roles: token.roles
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get('/loggedIn-users', (req, res) => {
    let user = req.body;
  
    Users.find(user)
    .then( saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  })

  
  router.get('/loggedIn-users/:id', (req, res) => {
    let user = req.body.id
  
    Users.findById(user)
    .then( saved => {
      res.status(201).json(saved.username);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json(error);
    })
  })
 
  router.put('/loggedIn-users/:id', (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    db.update(id, newUser).then(count => {
      res.status(200).json(newUser);
    }).catch(err => {
      res.status(500).json({error: "user could not be updated"})
    })
  });

  router.post('/loggedIn-users/:id', (req, res) => {
   db('newUser')
   .insert(req.body, 'id')
   .then(ids => {
    res.status(201).json(ids);
   }).catch(error => {
     res.status(500).json(error);
   })
 
  });

module.exports = router;