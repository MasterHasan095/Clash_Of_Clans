import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;
const API_URL = "https://api.clashofclans.com/v1/";
const BearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNlNTViMDNmLTgxZTMtNGRkNi1iM2MzLTQ5MTU0ZTc0MmY0YyIsImlhdCI6MTcwNzQwOTI5Mywic3ViIjoiZGV2ZWxvcGVyL2Q4MGQ5NTFlLWY0NTgtNzc4OS00OGE0LTUxZTg5MDQxYzg5MiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjk5LjI1Mi4xNTcuNzMiXSwidHlwZSI6ImNsaWVudCJ9XX0.85lDXsimRsc4rnz5oDgPi6005vzsZ1MC9wzgqPGYpJpCjDIWTEN1dsnbkwJJ0dottZpH3K0V6Inkd1MB79Pmug";

// Testing github
const config = {
    headers: { Authorization: `Bearer ${BearerToken}` },
};


app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.render("index.ejs");
})

// Clans

app.get("/clans", (req, res)=>{
    const content = ""
    res.render("clans.ejs", {
        content: content
    })})

app.post("/clans", async (req, res)=>{
    try{
        const clanTag = "%23" + req.body.tag;
        console.log(API_URL + "clans/" + clanTag)
        const result = await axios.get(API_URL + "clans/" + clanTag, config);
        const content = result.data
        res.render("clans.ejs", {
            content: content
        })
    }catch(error){
        console.log("Error");
    }
})

// Players

app.get("/players", (req, res)=>{
    res.render("players.ejs");
})

app.post("/players", async (req, res)=>{
    try{
        const playerTag = "%23" + req.body.tag;
        console.log(API_URL + "players/" + playerTag)
        const result = await axios.get(API_URL + "players/" + playerTag, config);
        const content = result.data    
        res.render("players.ejs", {
            content: content
        })
    }catch(error){
        console.log("Error");
    }
})

//Rankings
const result = await axios.get(API_URL + "locations?limit=15", config);
const locations = result.data.items;
const countries = []
for (let i = 0; i < locations.length; i++) {
    if (locations[i].isCountry == true){
        countries.push(locations[i]);
    }
  }

app.get("/rankings", (req, res)=>{
    res.render("rankings.ejs", {
        locations: countries
    })
})

app.post("/rankings", async (req, res)=>{
    const locationId = req.body.country;
    console.log(locationId);
    var result = await axios.get(API_URL + "locations/" + locationId + "/rankings/clans?limit=15", config);
    const clans = result.data.items;
    console.log(clans)
    var result = await axios.get(API_URL + "locations/" + locationId + "/rankings/players?limit=15", config);
    const players = result.data.items;
    console.log(players)

    res.render("rankings.ejs", {
        locations: countries,
        clans: clans,
        players: players,
    })
})


app.listen(PORT, ()=>{
    console.log(`Server running ${PORT}`);
})