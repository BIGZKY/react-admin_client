const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const mongo = new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true}, function(err, client) {
        
        if (err) throw err;
        var db = client.db("react_admin");
        resolve(db);
    });
})

module.exports = {
    mongo
}