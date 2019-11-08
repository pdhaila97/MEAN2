let userModel = require('../models/members.model');
module.exports = {
    addItemQuery: addItem,
    getAllItemsQuery: getAllItems,
    getItemByIdQuery: getItemById,
    updateItemByIdQuery: updateItemById,
    deleteItemByIdQuery: deleteItemById,
    deleteAllItemsQuery: deleteAllItems
}

function addItem(userDoc){
    userDoc.save((err)=>{
        if(err){
            console.log(err);
        }
    });
}

function getItemById(id){
    return userModel.find({_id: id}, (err) => {
        if(err){
            console.log(err);
        }
    })
}

function getAllItems(skippedQueries, skips){
    return userModel.find({}).skip(skippedQueries).limit(skips);
}

function updateItemById(id, userDoc){
    userModel.update({_id: id}, userDoc, (err) => {
        if(err){
            console.log(err);
        }
    });
}

function deleteItemById(id){
    userModel.deleteOne({_id: id}, (err) => {
        if(err){
            console.log(err);
        }
    })
}

function deleteAllItems(){
    userModel.deleteMany({}, (err) => {
        if(err){
            console.log(err);
        }
    });
}