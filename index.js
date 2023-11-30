import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port  = 3000;
const API_URL = "http://api.weatherstack.com/current"
const apiKey = "269129ee9c3c1ab609bca18eec72dddc"; 

const config = {
    params: {
        access_key: apiKey,
    },
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/", async (req, res) => {
    const countryName = req.body.name;
    try{
        const result = await axios.get(API_URL + "?query=" + countryName, config);
        res.render("index.ejs", { content: result.data });
    } catch (error){
        res.render("index.ejs", { content: error.response.data});
    }
});

app.get("/", (req, res) => {
    res.render("index.ejs", { content : "Search For Your Place Weather "});
});
app.listen(port, () => {
    console.log(`Server is running at ${port}.`);
});