// Import express and path modules.
var express = require("express");
var path = require("path");
// Create the express app.
var app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function (req, res) {
    res.render("index");
})
app.post('/survey', function (req, res){
    // req.session.data = req.body;
    // console.log(req.session.name);
    res.render("index");
    
});

// Start Node server listening on port 8000.
var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on("posting_form", function (data) {

    io.emit('passData', {response: "You name: "+data.name+". Location: "+data.location+". Language: "+data.language+". Comment: "+data.comment+"."});
    
    io.emit('random_number', {response: "Your lucky number emitted by the server is "+Math.floor((Math.random() * 1000) + 1)+". "});

    });
})

