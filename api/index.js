// import dotenv from 'dotenv'
// import express, { request, response } from "express";
// import cors from "cors";
// import mongoose from 'mongoose'
// import mainRouter from './routes/main.route.js'

// dotenv.config()
// const app = express()
// app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
// app.use(express.json())
// mongoose.set('strictQuery',false)
// mongoose.connect(process.env.DATABASE_URL)

// const starterIdSchema = new mongoose.Schema({
//     content: Number,
//   })

// const StarterId = mongoose.model('StarterId', starterIdSchema)

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });


// app.get('/api/starterids', async (req, res) => {
//     try {
//       // Increment contentIndex by 1 and retrieve updated document
//       const starterId = await StarterId.findOneAndUpdate(
//         {}, // Assuming only one document
//         { $inc: { content: 1 } },
//         { new: true, upsert: true }
//       );
  
//       // Use the updated contentIndex to select factors
//       const contentIndex = starterId.content;
//       //const factors = factorsArray[contentIndex % factorsArray.length];
  
//       res.json({
//         content
//         //factors
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
// })

// // app.get('/api/starterids',(request, response) => {
// //     StarterId.find({}).then(id => {
// //         response.json(id)
// //     })
// //       .catch()
// //   })

// // app.put('/api/starterids/:id'), (request, response) => {
// //     const body = request.body
// //     console.log(body)

// //     const starterId = {
// //         content: body.starterId,
// //     }
// //     try{
        
// //         StarterId.findByIdAndUpdate(request.params.id, starterId, { new: true })
// //         .then(updatedStarterIndex => {
// //           response.json(updatedStarterIndex)
// //         })
// //     }
// //     catch(error) {
// //         console.error(error.message)
// //     }
// // }
    
// //     try {
// //         if (body.StarterId == 3) {
// //             StarterId.updateMany({"$set":{ $inc: { content: 1 }}})
// //         } else {
// //             StarterId.updateMany({"$set":{"content": 0}})
// //         }
// //     }
// //     catch(e){
// //         console.error(e.message)
// //     }
// // }
// // app.use("/api/starterids", mainRouter)
// // const starterId = new StarterId({
// //     content: 0,
// // })
// // starterId.save().then(result => {
// //     console.log("id saved")
// //     mongoose.connection.close()
// // })

// app.listen(8800, ()=> {
//     console.log("Server running in port 8800")
// })
import dotenv from 'dotenv'
import express from 'express'
import cors from "cors";
import mongoose from 'mongoose'


dotenv.config()
const app = express();
const port = 8800;
app.use(cors({origin: 'https://eksp-psyhh-katse-frontend.vercel.app/', credentials: true}))

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const starterIdSchema = new mongoose.Schema({
    content: { type: Number, required: true },
    // add other fields as necessary
  });
  
  const StarterId = mongoose.model('starterids', starterIdSchema);

// Array of factors to use
const factorsArray = [
  { fontSize: '12px', backgroundColor: 'white' },
  { fontSize: '14px', backgroundColor: 'lightgray' },
  { fontSize: '16px', backgroundColor: 'lightblue' },
  // Add more factors as needed
];

// Get and increment content index on app start
app.get('/start-test', async (req, res) => {
  try {
    // Increment contentIndex by 1 and retrieve updated document
    const starterId = await StarterId.findOneAndUpdate(
      {}, // Assuming only one document
      { $inc: { content: 1 } },
      { new: true, upsert: true }
    );

    // Use the updated contentIndex to select factors
    const content = starterId.content % 4;
    //const factors = factorsArray[contentIndex % factorsArray.length];

    res.json({
      content,//factors
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
