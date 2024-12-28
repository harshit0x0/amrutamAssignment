import mongoose from 'mongoose';

export async function testDB(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/amrutamAssignment');
        console.log("Connected to database");
    }catch(e){
    console.log("Cannot connect to database", e);
}
}
