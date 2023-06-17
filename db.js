require('dotenv').config()
const mongoose = require('mongoose');

const url = 'mongodb+srv://akashdsingh006:9038541004@cluster.n3e2aez.mongodb.net/Zwigato?retryWrites=true&w=majority';


const database = process.env.DATABASE;


const mongoDB = async () => {
  try {
    await mongoose.connect(`${database}`);
    console.log('Connected to the database');

    const fetch_data = await mongoose.connection.db.collection('food_items');
    const data = await fetch_data.find({}).toArray();
    global.food_items = data;
    //console.log(global.food_items);

    const foodCategory = await mongoose.connection.db.collection('foodCategory');
    const catData = await foodCategory.find({}).toArray(); 
    
    global.foodCategory=catData

    //console.log(global.foodCategory)
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
