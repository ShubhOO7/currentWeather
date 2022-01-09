//console.log("hello world");
const apiKey = "3f21b74aceb9b3275ffc5107cc4ed752";



const express =  require ("express");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(__dirname));
app.set("view engine" , "hbs");


const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    res.render("index");
})


app.post('/',(req,res)=>{
    //  console.log(req.body.cityName);
    
      const city = req.body.cityName;
      const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city +"&units=" + unit + "&appid="+apiKey;
     
    
    
    https.get(url, function(response){
      //  console.log(response.statusCode);
   
        response.on("data",function(data){
          const WeatherData = JSON.parse(data);
          console.log(WeatherData);
          if(WeatherData.cod === '404'){
            res.render("index");
          }
          else{
            const temp = WeatherData.main.temp ;
            const description = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const iconURl =  "http://openweathermap.org/img/wn/"+ WeatherData.weather[0].icon+"@2x.png";
      
      
           /// console.log(temp + "deg C");
          //  console.log(description);¸
              console.log(icon);
              res.render("index",{
              Lucknow : WeatherData.name,
              16.99 : temp,
              link : iconURl,
              Cloudy :  description,
              94 : WeatherData.main.humidity,
              1.54 : WeatherData.wind.speed
              });
          }
        })

      });


      
    //   request(url, function (err, response, body) {
    //     if(err){
    //       res.render('index', {weather: null, error: 'Error, please try again'});
    //     } else {
    //       let weather = JSON.parse(body)
    //       if(weather.main == undefined){
    //         res.render('index', {weather: null, error: 'Error, please try again'});
    //       } else {
    //         let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    //         res.render('index', {weather: weatherText, error: null});
    //       }
    //     }
    //   });
})
    



app.get('/',(req,res)=>{
  //res.sendFile(__dirname + "/weather.html");
})
app.get('/weather.css', function(req, res) {
    res.sendFile(__dirname + "/weather.css");
  });




app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:3000`)
})




// app.post('/',(req,res)=>{
//     //  console.log(req.body.cityName);
    
//       const city = req.body.cityName;
//       const unit = "metric";
//       const url = "https://api.openweathermap.org/data/2.5/weather?q="+city +"&units=" + unit + "&appid="+apiKey;
//       https.get(url, function(response){
//       //  console.log(response.statusCode);
        
//         response.on("data",function(data){
//           const WeatherData = JSON.parse(data);
//          // console.log(WeatherData);
//           const temp = WeatherData.main.temp ;
//           const description = WeatherData.weather[0].description;
//           const icon = WeatherData.weather[0].icon;
//           const iconURl =  "http://openweathermap.org/img/wn/"+ WeatherData.weather[0].icon+"@2x.png";
    
    
//          /// console.log(temp + "deg C");
//         //  console.log(description);¸
    
//         res.write("<p>The weather description in "+req.body.cityName+ " is currently  "+ WeatherData.weather[0].description + "</p>")
//         res.write("<h1>The temperature in "+ req.body.cityName+" is   " + temp + "<span>&#8451;</span> <h1>");
    
//           res.write("<img src="+ iconURl + ">");
//           res.send();
//         })
//       });
// })
    
