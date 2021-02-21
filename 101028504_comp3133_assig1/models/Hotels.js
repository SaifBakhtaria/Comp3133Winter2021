const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_name: {
    type: String,
    required: [true],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: [true],
    trim: true,
    uppercase: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
 city:{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
 price: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0){
         throw new Error();
      }
    }
  },
  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdAt'
  },
});

const hotel = mongoose.model("Hotel", HotelSchema);
module.exports = hotel;