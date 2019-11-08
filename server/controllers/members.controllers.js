let userModel = require('../models/members.model');
let repo = require('../repositories/members.queries');

module.exports = {
    addItem: function (req, res, next){
        let userStr = req.body.member;
        let user = JSON.parse(userStr);
        let userDoc = new userModel({
            name: user.name,
            email: user.email, 
            address: user.address,
            phone: user.phone
        });
        repo.addItemQuery(userDoc);
        res.send(userStr);
    
    },
    
    getAllItems: async function(req, res, next){
        let page = Number.parseInt(req.query.page);
        let skips = +req.query.skips;
        let skippedQueries = (page-1)*skips;
        let data = await repo.getAllItemsQuery(skippedQueries, skips);
        res.send(data);
    },
    
    getItemById: async function(req, res, next){
        let id = req.params.id;
        let data = await repo.getItemByIdQuery(id);
        res.send(data[0]);
    },
    
    updateItemById: function(req, res, next){
        let id = req.params.id;
        let userStr = req.body.member;
        // console.log("Inside Put..." + req.body);
        let user = JSON.parse(userStr);
        let userDoc = {
            name: user.name,
            email: user.email, 
            address: user.address,
            phone: user.phone
        };
        repo.updateItemByIdQuery(id, userDoc);
        res.send(user);
    },
    
    deleteAllItems: function(req, res, next){
        repo.deleteAllItemsQuery();
        res.json({message: 'deleted all items'});
    },
    
    deleteItemById: function(req, res, next){
        let id = req.params.id;
        repo.deleteItemByIdQuery(id)
        res.json({message: `deleted item with ID: ${id}`});       
    }
}
