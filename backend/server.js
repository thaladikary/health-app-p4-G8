// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai
require('dotenv').config();
const { AssemblyAI } = require('assemblyai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY
});

// const FILE_URL =
//   'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
// const FILE_URL = './path/to/file.mp3';

// Request parameters 
app.post("/transcribe", async(req,res)=>{
   
    try{
        console.log("TEST",req.body)
        const {audioFile} = req.body;
        
        const data ={
            audio_url: audioFile
        }

        const transcript = await client.transcripts.create(data)
        console.log(transcript.text)
        res.json({transcript: transcript.text})
    }catch(e){
        res.status(500).json({error: 'Internal Server Error'})
    }
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
