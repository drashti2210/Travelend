const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Hotel = new Schema({
  hotelid:{
    type:String,
    unique:true
  },
  hotelname: {
    type: String
  },
  destname: {
    type: String
  },
  hotelimgurl:
  {
      type:String
  },
  hotelcost:
  {
      type:Number
  },
  hoteldetails: {
    type: String
  },
},

{
    collection: 'hotels'
});

module.exports = mongoose.model('Hotel', Hotel);