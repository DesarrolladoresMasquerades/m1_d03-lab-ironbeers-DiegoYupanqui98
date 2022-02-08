const express = require('express');
const { json } = require('express/lib/response');

const hbs = require('hbs');
const { parse } = require('path');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:ç

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get("/beers/beer-*", (req, res) => {
  const beerPath = req.path;
  const beerID = parseInt(beerPath.substring(12, beerPath.length))

  punkAPI
    .getBeer(beerID)
    .then(beerFromApi =>
      res.render("pickedBeer", {beer:beerFromApi[0]}))
    .catch(error => console.log(error))
})


app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) =>
      res.render('beers', { beersFromApi }))

    .catch(error => console.log(error))
})
app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then((beerFromApi) => res.render('random-beer', beerFromApi[0]))

    .catch(error => console.log(error))
})


app.get('/', (req, res) => {
  res.render('index');
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
