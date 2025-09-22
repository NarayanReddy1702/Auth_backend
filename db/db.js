import mongoose from 'mongoose'


async function DBconnection(){
   try {
    await  mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME}`)
    console.log("DB Connected successfully !");
   } catch (error) {
    console.log("DB Connection Error !");
    
   }
}
 

export default DBconnection
