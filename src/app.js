const path= require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode= require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

const port= process.env.PORT || 3000
// Defines paths for express config
const publicDirectoryPath=path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, "../public/templates/views");
const partialsPath= path.join(__dirname,'../public/templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup sstatic directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:" SHeharyar"
    });
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Sheharyar"
        
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:"Help Page",
         name: "SHeharyar"
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
  
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })

    }


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Sheharyar",
        errorMessage:"Help article not found"
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Sheharyar",
        errorMessage:"Page Not Found"
    })
})


console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.listen(port,()=>{
    console.log("Server is up on port 3000."+port)
})