const request = require('request');

const forecast = (lat, lon ,callback)=>{
    const url= "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f55bcf01eb74dc447c943188db7e017f"
   
    request({url,json:true},(error,{body})=>{
        const data=body.main;

        if(error){
                calllback("Disable to connect weather serivces",undefined);
                }   
                else if(body.message){
                    callback("Unable to Find location",undefined)
                }
                else{
                callback(undefined," It's a "+(data.temp -273).toFixed(2)+" C" +" "+ " and Feels like "  +(data.feels_like - 273.15).toFixed(2)+"C")  

                }
    })
}
module.exports=forecast;