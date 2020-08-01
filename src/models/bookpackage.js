const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bookpackage = new Schema({
  
  username: {
    type: String
  },
  packname:
  {
      type:String
  },
 
},{
    collection: 'bookpackage'
});

module.exports = mongoose.model('bookpackage', Bookpackage);