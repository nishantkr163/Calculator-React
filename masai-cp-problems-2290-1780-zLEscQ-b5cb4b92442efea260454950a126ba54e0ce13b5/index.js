const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose any port you prefer

// Middleware
app.use(bodyParser.json());

// Middleware: logger
app.use((req, res, next) => {
  console.log(`URL: ${req.url}, Method: ${req.method}, Timestamp: ${new Date()}`);
  next();
});

// Sample database
const db = require('./db.json');

// Middleware: addID
app.use((req, res, next) => {
  const heroes = db.heroes;
  const lastHero = heroes[heroes.length - 1];
  if (lastHero) {
    req.body.id = lastHero.id + 1;
  } else {
    req.body.id = 1;
  }
  next();
});

// Middleware: auth
app.use('/update/villain/:hero_id', (req, res, next) => {
  const role = req.headers.role;
  const pass = req.headers.pass;

  if (role === 'admin' && pass === 'saveEarth') {
    next();
  } else {
    res.status(403).json({ message: 'Not Authorized' });
  }
});

app.use('/delete/hero/:hero_id', (req, res, next) => {
  const role = req.headers.role;
  const pass = req.headers.pass;

  if (role === 'admin' && pass === 'saveEarth') {
    next();
  } else {
    res.status(403).json({ message: 'Not Authorized' });
  }
});

// API Endpoints

// 1. Add a new hero
app.post('/add/hero', (req, res) => {
  const newHero = req.body;
  db.heroes.push(newHero);
  res.json({ OK: db.heroes });
});

// 2. Retrieve details of all heroes
app.get('/heroes', (req, res) => {
  res.json({ OK: db.heroes });
});

// 3. Update villains for a hero
app.patch('/update/villain/:hero_id', (req, res) => {
  const heroId = parseInt(req.params.hero_id);
  const villain = req.body;
  const hero = db.heroes.find((h) => h.id === heroId);

  if (!hero) {
    res.status(404).json({ message: 'Hero not found' });
  } else {
    hero.villains.push(villain);
    res.json({ OK: hero });
  }
});

// 4. Delete a hero
app.delete('/delete/hero/:hero_id', (req, res) => {
  const heroId = parseInt(req.params.hero_id);
  const index = db.heroes.findIndex((h) => h.id === heroId);

  if (index === -1) {
    res.status(404).json({ message: 'Hero not found' });
  } else {
    db.heroes.splice(index, 1);
    res.json({ OK: db.heroes });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});