import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", async (req, res)=>{
    const result = await axios.get("")
})
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})