const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Package = new Schema({
  pkgid:{
    type:Number,
    unique:true
  },
  pkgname: {
    type: String
  },
  cost:
  {
      type:Number
  },
  noofdays:{
    type: Number
  },
 
  initdest: {
    type: String
  },
  imgurl: {
    type: String
  },
  pkgdetails: {
    type: String
  },
},

{
    collection: 'packages'
});

module.exports = mongoose.model('Package', Package);