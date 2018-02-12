var express = require("express");
// var path = require("path");
var bodyParser = require("body-parser");
var app = express();

// app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));

// app.set('views', path.join(__dirname, './views'));

app.set("views", __dirname + "/views");

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
})
app.post('/survey', function (req, res){
   
    res.render("index");
    
});

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    socket.on("submit_form", function (data) {
        newobj = {
            name : data.name,
            location : data.location,
            language : data.language,
            comment : data.comment,
            number: Math.floor(Math.random()*1001)
        }
        console.log(data.name, data.location)
        socket.emit("server_response", newobj)
       
    });
})

