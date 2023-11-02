import express from "express";
import mongoose from "mongoose";
// import body, { urlencoded } from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.listen(port, ()=>{
    console.log(`server hosted on ${port}`);
})

mongoose.connect("mongodb://0.0.0.0:27017/location", { 
    useNewUrlParser: true
});

const citySchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    besttime: String,
    img_loc: String
});

const City = mongoose.model("City", citySchema);

// const Mumbai = new City({
//     name: "Mumbai",
//     location: "Mumbai is the capital city of Maharashtra and is situated on the west coast of India. It is the most populous city in India.",
//     besttime: "October to February",
//     description: "Mumbai is the financial, commercial, and entertainment hub of India. It offers a blend of colonial-era architecture, bustling markets, and a vibrant nightlife. Must-visit attractions include the Gateway of India, Marine Drive, and the Elephanta Caves.",
//     img_loc: "./media/Mumbai.jpg"
// });
// const Pune = new City({
//     name: "Pune",
//     location: "Pune is located in western Maharashtra and is known as the \"Oxford of the East\" due to its educational institutions.",
//     besttime: "October to March",
//     description: "Pune is known for its rich history, pleasant climate, and educational institutions. It offers a mix of historical sites, cultural events, and a thriving IT sector. Popular places to visit include the Aga Khan Palace, Shaniwar Wada, and Osho International Meditation Resort.",
//     img_loc: "./media/Pune.png"
// });

// const CSN = new City({
//     name: "Chhatrapati Sambhaji Nagar",
//     location: "Chhatrapati Sambhaji Nagar is in the central part of Maharashtra and is often called the \"Tourism Capital of Maharashtra.\"",
//     besttime: "October to March",
//     description: "Chhatrapati Sambhaji Nagar is renowned for its historical sites, including the UNESCO World Heritage Sites of Ajanta and Ellora Caves. It is also home to the famous Bibi Ka Maqbara, a tomb often compared to the Taj Mahal.",
//     img_loc: "./media/chhatrapatisambhajinagar.jpg"
// });

// const Nagpur = new City({
//     name: "Nagpur",
//     location: "Nagpur is located in the eastern part of Maharashtra and is known as the \"Orange City.\"",
//     besttime: "October to February",
//     description: "Nagpur is a major city in central India and is famous for its juicy oranges. It offers a mix of natural beauty and historical sites. The Deekshabhoomi, an important Buddhist stupa, is a significant attraction in the city.",
//     img_loc: "./media/Nagpur.jpg"
// });

// const Nashik = new City({
//     name: "Nashik",
//     location: "Nashik is situated in northwestern Maharashtra and is known for its vineyards.",
//     besttime: "October to March",
//     description: "Nashik is a city with a rich mythological and historical background. It is famous for the Kumbh Mela and is a hub for wine tourism. The Sula Vineyards and Trimbakeshwar Temple are popular places to visit.",
//     img_loc: "./media/Nashik.jpg"
// });

// const Kolhapur = new City({
//     name: "Kolhapur",
//     location: "Kolhapur is in southwestern Maharashtra and is known for its cultural heritage.",
//     besttime: "October to March",
//     description: "Kolhapur is renowned for its traditions of art, music, and handicrafts. The city is also known for its spicy cuisine and the historic Mahalaxmi Temple.",
//     img_loc: "./media/kolhapur.jpg"
// });

// const Mahabaleshwar = new City({
//     name: "Mahabaleshwar",
//     location: "Mahabaleshwar is a hill station in the Western Ghats of Maharashtra.",
//     besttime: "October to June",
//     description: "Mahabaleshwar is a popular hill station known for its lush greenery, scenic viewpoints, and pleasant weather. It's a perfect retreat from the heat of the plains.",
//     img_loc: "./media/mahabaleshwar.jpg"
// });

// await City.insertMany([Mumbai, Pune, CSN, Nagpur, Nashik, Kolhapur, Mahabaleshwar]);

// Pune.save();

// await City.deleteMany();

app.get("/",(req,res)=>{
    res.render(__dirname + "/public/home.ejs");
});
 
app.get("/index",(req,res)=>{
    res.render(__dirname + "/public/index.ejs");
});

app.get("/home",(req,res)=>{
    res.render(__dirname + "/public/home.ejs");
});

app.post("/search",(req,res)=>{
    var cname1;
    cname1 = req.body.cname;
    
    City.findOne({name:cname1})
    .then((docs)=>{
        res.render(__dirname + "/public/search.ejs", {name: docs.name, location: docs.location, bestt: docs.besttime, descp: docs.description, img_loc1: docs.img_loc})
    })
    .catch((err)=>{
        console.log(err);
    });
});
