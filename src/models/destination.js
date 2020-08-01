const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dest = new Schema({
  
  destid: {
    type: String,
    unique:true
  },
  destname:
  {
      type:String
  },
  destdetail: {
    type: String
  },
  imgurl:
  {
      type:String
  },
  pkgname:
  {
      type:String
  }
},{
    collection: 'destination'
});

module.exports = mongoose.model('Destination', dest);