var fs =require('fs');
/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.get('/static-menu/', function( res) {fs.readFile('alter_api_feed.xml', 'utf8', function(err, data) {
    if (!err) {
        // it is important to set Content-Type properly!
        res.set('Content-Type', 'text/xml');
        res.send(data);
    }
    else {
        console.log('alter_api_feed.xml file not found!');
        res.status(500).send('Server could not provide feed!');
    }
});
    // the feed returning logic goes here
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
