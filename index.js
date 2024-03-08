var express=require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')


const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/database')
var db=mongoose.connection
db.on('error',()=> console.log("error in connecting to db"))
db.once('open',()=> console.log("connected to db"))

app.post("/sign_up",(req,res) => {
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phono=req.body.phono
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phono":phono,
        "gender":gender,
        "password":password 
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err)
        {
            throw err
        }
        console.log("record inserted ")

    })
    return res.redirect('signup_succes.html')
})



app.get("/",(req,res) =>  {
    res.set({
        "Allow-access-Allow-origin":'*'
    })
    return res.redirect('index.htm')

}).listen(2000);
console.log("port")