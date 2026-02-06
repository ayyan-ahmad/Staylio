const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then((res)=>{
    console.log("Connection succssful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect( MONGO_URL); 

}
const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"6974a168e570d818bd177eee"}));// add owner field to each listing
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
};
initDB();