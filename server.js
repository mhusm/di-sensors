let express = require("express");
let app = express();
let path = require('path');



// serve the index.html as starting page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});


app.use(express.static('public'));

let port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);