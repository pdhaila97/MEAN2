const addr = __dirname + '\\..\\..\\dist\\my-app';

const membersController = require('../controllers/members.controllers');

const express = require('express');
// const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: true}));




module.exports = function () {

    router.use(bodyParser.json());

    router.use('/', express.static(addr));

    router.get('/list', (req, res, next) => {
        res.redirect('/');
    });
    
    router.post('/api/add-item', membersController.addItem);

    router.get('/api/get-all-items', membersController.getAllItems);

    router.get('/api/get-item/:id', membersController.getItemById);

    router.put('/api/update-item/:id', membersController.updateItemById);

    router.delete('/api/delete-all-items', membersController.deleteAllItems);    
    
    router.delete('/api/delete-item/:id', membersController.deleteItemById);

    router.get('/api/:name', (req, res, next) => {
        console.log(req.query.id + " and " + req.params.name);
    })
    
    router.get('/api/sample-hitting-get/:id', (req, res, next) => {
        let token = req.query.token;
        let id = req.params.id;
        res.send('Token is '+token+" and ID is" + id);
        console.log(req.protocol+" "+req.subdomains+ " " + req.hostname + " " + req.path + " " + req.originalUrl + " ");
        console.log(req.headers);
    })

    return router;

};