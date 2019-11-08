const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// let addressSchema = new Schema(
//     {
//         address: String
//     },
//     {
//         _id: false,
//         id: false
//     }
// );

var memberSchema = new Schema(
    {   
        name: String,
        email: String, 
        address: [String],
        phone: String,
    }
);

let userModel = mongoose.model('memberModel', memberSchema);

module.exports = userModel;