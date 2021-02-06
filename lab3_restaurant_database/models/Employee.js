const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //minlength:10,
    //maxlength: 50,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
    trim: true,
    lowercase: true
  },
  city:{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  designation: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    default: 0.0,
    //min: [1000, 'Too less Salary'],
    //max: 12000,
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary aren't real.");
      }
    }
  },
  created: { 
    type: Date,
    default: Date.now
  },
});

//Declare Virtual Fields
EmployeeSchema.virtual('fullname')
              .get(function(){
                return `${this.firstname} ${this.lastname}`
              })
              .set(function(value){
                //Set values as needed
              })

//Custome Schema Methods
//1. Instance Method Declaration
EmployeeSchema.methods.getFullName = function(){
  console.log(`Full Name : ${this.firstname} ${this.lastname}`)
  return `${this.firstname} ${this.lastname}`
}

//2. Static method declararion
EmployeeSchema.statics.getEmployeeByFirstName = function(value){
  return this.find({firstname : value})
}


/*
EmployeeSchema.pre('save', true, (next) => {
  console.log("Before Save")
  //next();
});
*/

EmployeeSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

EmployeeSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

EmployeeSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

EmployeeSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;