const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and models for Mentor and Student
const factSchema = new mongoose.Schema({
  factData: String,
  
}, { collection: `${process.env.COLLECTION}` }); // Specify the collection name



const Fact= mongoose.model('Fact', factSchema);


// API endpoints




// Create Fact
app.post('/facts', async (req, res) => {
  try {
   
    const {factData} = req.body;
    const fdata = await Fact.create({ factData });
    res.status(201).json(fdata);
    console.log( factData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create fact' });
  }
});


// Get all fact
app.get('/allfacts', async (req, res) => {
    try {
      const facts = await Fact.find();
      res.status(200).json(facts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve mentors' });
    }
  });
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

