import dotenv from 'dotenv'
import express from 'express'
import cors from "cors";
import mongoose from 'mongoose'


// MongoDB connection URI from environment variables
dotenv.config()
const app = express();
app.use(cors({origin: 'https://eksp-psyhh-katse-frontend.vercel.app/', credentials: true}))

const mongoUri = process.env.MONGODB_URI

// Cache the database connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const client = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = client.connection;
  return cachedDb;
}

module.exports = async (req, res) => {
  try {
    const db = await connectToDatabase();

    const starterIdSchema = new mongoose.Schema({ content: Number });
    const StarterId = mongoose.model('starterids', starterIdSchema);

    const result = await StarterId.findOneAndUpdate(
      {}, // filter
      { $inc: { content: 1 } }, // increment contentIndex
      { new: true, upsert: true } // return updated document or insert if not found
    );

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating contentIndex:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};










// dotenv.config()
// const app = express();
// const port = 8800;
// app.use(cors({origin: 'https://eksp-psyhh-katse-frontend.vercel.app/', credentials: true}))

// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const starterIdSchema = new mongoose.Schema({
//     content: { type: Number, required: true },
//     // add other fields as necessary
//   });
  
//   const StarterId = mongoose.model('starterids', starterIdSchema);

// // Array of factors to use

// // Get and increment content index on app start
// app.get('/start-test', async (req, res) => {
//   try {
//     // Increment contentIndex by 1 and retrieve updated document
//     const starterId = await StarterId.findOneAndUpdate(
//       {}, // Assuming only one document
//       { $inc: { content: 1 } },
//       { new: true, upsert: true }
//     );

//     // Use the updated contentIndex to select factors
//     const content = starterId.content % 4;
//     //const factors = factorsArray[contentIndex % factorsArray.length];

//     res.json({
//       content,//factors
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });