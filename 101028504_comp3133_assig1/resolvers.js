const Hotel = require('./models/Hotels');

exports.resolvers = {
    Query: {
        getHotel: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelByID: async (parent, args) => {
            return await Hotel.findById(args.id);
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city});
        }
    },
    Mutation: {
        addHotel: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("email not in proper format")
            }

            let newHotel = new Hotel({
                hotel_id: args.ID,
                hotel_name: args.hotel_name,
                street: args.street,
                email: args.email,
                Postal_code: args.Postal_code,
                city: args.city,
                price: args.price
            });
        return await newHotel.save();
      },
      updateHotel: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }
            return await Hotel.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    hotel_id: args.ID,
                    hotel_name: args.hotel_name,
                    street: args.street,
                    email: args.email,
                    Postal_code: args.Postal_code,
                    city: args.city,
                    price: args.price
                }
            }, {new: true}, (err, hotel) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the employee');
                } else 
                {
                    return hotel
                }
            }
        );
      },
      deletehotel: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Hotel.findByIdAndDelete(args.id)
      },
    }
  }