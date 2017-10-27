const config  = require('./model/config'),
      User = require('./model/User'),
      mongoose = require('mongoose'),
      restify = require('restify'),
      corsMiddleware = require('restify-cors-middleware');

/* cross origin http */
const cors = corsMiddleware( { origins: ['http://127.0.0.1:5500'] } );
const server = restify.createServer({
    name    : config.name,
    version : config.version
});



server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);
server.use((req, res, next) => {
    // access token
    console.log(new Date(), req.method, req.url);
    next();
});


server.get('/user', (req, res) => {

    User.apiQuery(req.params, (error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

});


server.get('/user/:id', (req, res) => {
    
    User.findOne({ _id : req.params.id }, (error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

});


server.post('/user', (req, res, next) => {

    User(req.body).save((error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

});


server.put('/user/:id', (req, res) => {
    
    User.update({ _id : req.params.id }, req.body, (error, results) => {
        if (error) throw error;

        let data = { _id : req.params.id, ...req.body };
        res.end(JSON.stringify(data));
    });
        
});


server.del('/user/:id', (req, res) => {

    User.remove({ _id : req.params.id }, (error, results) => {
        if (error) throw error;
        
        let data = { _id : req.params.id , message : 'deleted user' };
        res.end(JSON.stringify(data));
    });

});    

server.listen(7779, () => {

    mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useMongoClient: true });

    let db = mongoose.connection;
    db.once('open', () => console.log(server.name, server.url));
});