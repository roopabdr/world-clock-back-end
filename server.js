const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const unirest = require('unirest');
// const http = require('http');
// const https = require('https');
const request = require('request');

const app = express();

app.use(bodyParser.json()); //used to parse req body key-value pairs
app.use(cors()); //used to override browser's same origin policy while making http/https API/fetch kind of requests

const APP_ID = '<YOUR_API_ID_HERE>';
const APP_CODE = '<YOUR_API_CODE_HERE>';

app.get('/', (req, res) => {
    res.send('It is working');
});

app.get('/city/:city', (req, res) => {
    const { city } = req.params;
    request.get({
        url: `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${APP_ID}&app_code=${APP_CODE}&query=${city}&beginHighlight=<b>&endHighlight=</b>`
    }, function(error, response, body){
        res.json(JSON.parse(body));
    });
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`app is running on port 4000`);
});