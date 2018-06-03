
  app.post('/register', (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      localizationImportance: 1,
      ratingImportance: 1,
      priceImportance: 1
    },
    function (err, user) {
        if (err) return res.status(500).send(err);
        res.status(200).send(user);
    });
  });

//metoda post do logowania, korzysta z bcrypta do odkodowania hasła
router.post('/login', async function (req, res) {
  let user = await db.findUserByEmail(req.body.email);
  //console.log("user: " + user);
  if (bcrypt.compareSync(req.body.password, user.password)) {
    req.session.userId = user.id
    req.session.userName = user.name
    sess = req.session;
    console.log(sess);
    res.status(200).send(JSON.stringify(user));
  } else {
    console.log("Nieprawidłowy email albo hasło.");
    res.end("Nieprawidłowy email albo hasło.");
  }
});

// metoda get do wylogowania
router.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(400).send(JSON.stringify(err));
    } else {
      console.log('logout successful')
      res.end('logout successful');
    }
  });
});