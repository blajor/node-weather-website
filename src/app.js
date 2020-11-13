const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// if this directory contains an index.html page that will be sent as response
app.use(express.static(publicDirectoryPath));

// this method will be served if no index.html page is found in the public directory
app.get('', (_, res) => {
    res.render('index', {
        title: 'Main Page',
        name: 'Jorge Blanco'
    });
})

app.get('/about', (_, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jorge Blanco'
    });
})

app.get('/help', (_, res) => {
    res.render('help', {
        title: 'Help Page',
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy " +
        "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not " +
        "only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the " +
        "release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        name: 'Jorge Blanco'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error) return res.send({error});

        forecast(lat, lon, (error, forecastData = {}) => {
            if(error) return res.send({error});
            
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

//***************** A GOOD EXAMPLE *********************************************/
app.get('/product', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    // console.log(search);
    // console.log(rating);
    res.send({
        products: []
    })
})

app.get('/help/*', (_, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jorge Blanco'
    })
})

// The following will take care of all 404 pages
// this method has to be the last method
app.get('*', (_, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jorge Blanco'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})