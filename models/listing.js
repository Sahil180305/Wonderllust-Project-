const mongoose = require("mongoose");

let Schema=mongoose.Schema;
let Review=require("./review");
let User=require("./user")
let listingScehma= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
        enum:["Mountain","Arctic","Farm","Camping","Beach","Castle","Pools","Iconic_Cities","Rooms","Boats","Dome","Amazing_Pools",""],
    },
});

listingScehma.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in : listing.reviews } });
    }
});

let Listing = mongoose.model("Listing",listingScehma)

module.exports=Listing;