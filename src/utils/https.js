const https= require("https");
const url= "https://api.openweathermap.org/data/2.5/weather?lat=24.846630&lon=67.171211&appid=f55bcf01eb74dc447c943188db7e017f"

const request=https.request(url, (response)=>{

    let data=''
    response.on('data',(chunk)=>{
          data=data + chunk.toString();
    })

    response.on('end',()=>{
        const body= JSON.parse(data);
        console.log(body)
    })

    response.on('error',(error)=>{
        console.log("An error",error)
    })
})


request.end();