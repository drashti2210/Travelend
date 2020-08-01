var express = require('express');
var session=require('express-session')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer=require('nodemailer')
var userlogin;
//var cors=requre('cors');
var app = express();
var Users = require('./models/login');
var Packages = require('./models/package');
var destinations = require('./models/destination'); 
var hotels = require('./models/hotel'); 

var cors=require('cors');
var bookpkg=require('./models/bookpackage')
const railway=require("railway-api-wrapper")
railway.setApiKey("2kzgrwg5ev")
railway.checkPNR(8326062891,(err,res)=>
{
  if(err)
  {
    console.log(err,"errrrrrrrrrrrrrrrr")
  }
  else
  {
    console.log(res)
  }
})
railway.nameOrNumber(19034,(err,res)=>{
  if(err)
  {
    console.log(err);
  }
  else{

    console.log(res,"railwayyyy");
  }
})
// railway.trainBetweenStations("ST","ADI","21-10-2019",(err,res)=>{
//   console.log("in between")
//   if(err){
//     console.log("wertytuiopkjkhjhgfgdfdfcghjkl")
//     console.log(err,"errrrr");
//   }
//   else{
//     console.log(res,"trian")
//   }
// })
railway.trainRoute(19034,(err,res)=>{
  if(err)
  {
    console.log(err,"route")
  }
  else{
    st=res["route"]
    console.log("Train route for GUJARAT QUEEN")
    console.log("Code","  Station Name")
    for(var i=0;i<res["route"].length;i++){
    
    console.log(JSON.stringify(res["route"][i]['station']['code']),JSON.stringify(res["route"][i]['station']['name']))

    console.log()
    
  }
}
})
// railway.trainArrivals("ST","11:00")
// railway.seatAvailability(19034,"ST","NVS","22-10-2019","2S","General",(err,res)=>{
//   if(err)
//   {
//     console.log(err,"in seat")
//   }
//   else{
//     console.log(res)
//   }
// })

app.use(session({secret: "session "}));

mongoose.connect('mongodb://localhost:27017/travelend',function (err,response){
if (err) { console.log('Database is not  connected'); }else{
    console.log('Database is connected');
  }
} 
);
app.use(cors());
app.set('port',process.env.port || 3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
const port = process.env.PORT || 3000;
const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
   });
   app.post('/login',function(req,res){
       console.log("in login");
       name=req.body.username;
       password=req.body.password;
       Users.findOne({"username":name},function(err,user)
       {
           if(err)
           {
               console.log(err);
               alert("file");
           }
           else{}
           if(user){
           if(user.username==name){
              // console.log(user.username);
              
               req.session.user=name
               req.session.save()
               userlogin=req.session.user
                console.log(req.session.user)
               console.log(req.session.user,"correct credentials.....");
            return res.send({status:'success',uname:name});
           }}
           else{
               console.log("wrong");
               return res.send({username:req.session.user,status:'fail'});
           }   
       }); 
    });
    app.delete('/delPkg/:id',function(req,res){

      console.log("in delpkg method");
      console.log(req.params.id);
      pkgid=req.query.data;
      Packages.find({"pkgid":req.params.id},function(err,pkg){
        if(err)
        {
          res.sendStatus({status:400})
          console.log("pkg not found")
        }
        else{
          console.log(pkg)
          Packages.remove({"pkgid":req.params.id,"deleted":null},function(err){
            if(err)
            {
              console.log("pkg not delete")
              res.send(400)
            }
            else
            {
              console.log("pkg removed")
              res.send({"message":"pkg remove"}) 
            }})
        }
      })
    });

    app.delete('/delHotel/:id',function(req,res){

      console.log("in delhotel method");
      console.log(req.params.id);
      hotelid=req.query.data;
      hotels.find({"hotelid":req.params.id},function(err,hotel){
        if(err)
        {
          res.sendStatus({status:400})
          console.log("hotel not found")
        }
        else{
          console.log(hotel)
          hotels.remove({"hotelid":req.params.id,"deleted":null},function(err){
            if(err)
            {
              console.log("hotel not delete")
              res.send(400)
            }
            else
            {
              console.log("hotel removed")
              res.send({"message":"hotel remove"}) 
            }})
        }
      })
    });
  
    app.delete('/delDest/:id',function(req,res){

      console.log("in deldest method");
      console.log(req.params.id);
      destid=req.query.data;
      destinations.find({"destid":req.params.id},function(err,dest){
        if(err)
        {
          res.sendStatus({status:400})
          console.log("destination not found")
        }
        else{
          console.log(dest)
          destinations.remove({"destid":req.params.id,"deleted":null},function(err){
            if(err)
            {
              console.log("destination not delete")
              res.send(400)
            }
            else
            {
              console.log("destination removed")
              res.send({"message":"destination remove"}) 
            }})
        }
      })
    });
  


  
  app.post('/register',function(req,res){
      name=req.body.username;
      pass=req.body.password;
      email=req.body.email;
      var user=new Users();
      user.username=name;
      user.email=email;
      user.password=pass;
      user.save(function(err,result){
        if(err)
        {
          console.log("error occur");
          console.log(err);
          res.send({success:'',status:500})
        }else{
          console.log("user added");
          res.send({success:'',status:200})

        }

      });
    });

    app.post('/packregister',function(req,res){
        pkgid=req.body.pkgid;
        pkgname=req.body.pkgname;
        pkgcost=req.body.pkgcost;
        noofdays=req.body.noofdays;
       // enddate=req.body.enddate;
        initdest=req.body.initdest;
        pkgdetails=req.body.pkgdetails;
        var package=new Packages();
        package.pkgid=pkgid;
        package.pkgname=pkgname;
        package.cost=pkgcost;
        package.noofdays=noofdays;
     //   package.enddate=enddate;
        package.initdest=initdest;
        package.pkgdetails=pkgdetails;
        package.save(function(err,result){
          if(err)
          {
            console.log("error occur");
            console.log(err);
            res.send({success:'',status:500})
          }else{
            console.log("packages added");
            res.send({success:'',status:200})
  
          }
  
        });
      });

      app.post('/destregister',function(req,res){
        console.log("in dest")
        packname=req.body.packname;
        destname=req.body.destname;
        destdetails=req.body.destdetails;
        destid=req.body.destid;
        var dest=new destinations();
        
        dest.pkgname=packname;
        dest.destname=destname;
        dest.destdetail=destdetails;
        dest.destid=destid;
        console.log(dest)
        dest.save(function(err,result){
          if(err)
          {
            console.log("error occur");
            console.log(err);
            res.send({success:'',status:500})
          }else{
            console.log("destination added");
            res.send({success:'',status:200})
  
          }
  
        });
      });
      
      app.post('/hotelregister',function(req,res){
        console.log("in hotel")
        hotelid=req.body.hotelid;
        hotelname=req.body.hotelname;
        hotelcost=req.body.hotelcost;
        destname=req.body.desname;
        hoteldetails=req.body.hoteldetails;
        
        var hotel=new hotels();
        
        hotel.hotelid=hotelid;
        hotel.hotelname=hotelname;
        hotel.hotelcost=hotelcost;
        hotel.destname=destname;
        hotel.hoteldetails=hoteldetails;
        console.log(hotel)
        hotel.save(function(err,result){
          if(err)
          {
            console.log("error occur");
            console.log(err);
            res.send({success:'',status:500})
          }else{
            console.log("hotel added");
            res.send({success:'',status:200})
  
          }
  
        });
      });
      

    app.get("/pkgDetail",function(req,res){
      console.log("dffghjjkl")
      //var user=new Packages()
     
      Packages.find({},function(err,pkg){
        if(err)
        {
          res.send(400);
        }
        else
        {
          console.log("all pkg");
         console.log(pkg)
          res.send(pkg);
        }
      });

    });

    app.get("/HotelDetail",function(req,res){
      console.log("dffghjjkl")
      //var user=new Packages()
     
      hotels.find({},function(err,hotel){
        if(err)
        {
          res.send(400);
        }
        else
        {
          console.log("all hotel");
          //console.log(hotel)
          res.send(hotel);
        }
      });

    });
    app.get("/hotelBydest/:data",function(req,res)
    {
      console.log("in delhotel by dest method");
      console.log(req.params.data);
     
      hotels.find({"destname":req.params.data},function(err,hotel){
        if(err)
        {

          res.sendStatus({status:400})
          console.log("pkg not found")

        }
        else{
         // console.log(hotel)
         res.send(hotel)
        }
      })

    })

    app.get("/destDetail",function(req,res){
      console.log("dffghjjkl")
      //var user=new Packages()
     
      destinations.find({},function(err,pkg){
        if(err)
        {
          res.send(400);
        }
        else
        {
          console.log("all dest");
          // console.log(pkg)
          res.send(pkg);
        }
      });

    });
    app.get("/destbypkgname/:data",function(req,res){

      destinations.find({"pkgname":req.params.data},function(err,pkg){
        if(err)
        {
          res.send(400);
        }
        else
        {
          console.log("all dest by name");
          console.log(pkg)
          res.send(pkg);
        }
      });
    })
    app.get('/book_pkg/:data;:id',function(req,res){
      console.log("in booooooooooo")
      
      pkgname=req.params.data;
      console.log(req.params.id)
      uname=req.params.id;
      console.log(pkgname,uname)
      var bookpack=new bookpkg()
      bookpack.username=uname
      console.log(uname)
      bookpack.packname=pkgname
      bookpack.save(function(err,result){
        if(err)
        {
          console.log("error in book packages...")
        }
        else{
          console.log(result)
          console.log("package booked")
          res.send({status:200})
        }
      })
    
    })

    app.post("/updatepkg/:pkgid",function(req,res){
      console.log("in update package")
    
      Packages.updateOne({"pkgid": req.params.pkgid},{"pkgname":req.body.pkgname,"cost":req.body.pkgcost,"noofdays":req.body.noofdays,"initdest":req.body.initdest,"pkgdetails":req.body.pkgdetails},function(err,data){
        if(err){
          console.log("Error in update")
    
        }else{
          console.log(data);
          
          
        }
        
      });
    })

    app.post("/updatedest/:destid",function(req,res){
      console.log("in update package")
    console.log(req.params.destid)
      destinations.updateOne({"destid": req.params.destid},{"destname":req.body.destname,"destdetail":req.body.destdetail},function(err,data){
        if(err){
          console.log("Error in update")
    
        }else{
          console.log(data);
          
          
        }
        
      });
    })



    app.post("/book",function(req,res){
      console.log("in bok hotel")
      
      name=req.body.txtuname;
      rooms=req.body.txtrooms
      bdate=req.body.txtbdate
      person=req.body.txtperson
      days=req.body.noofdays
      var email;
      Users.findOne({"username":name},function(err,user)
      {
          if(err)
          {
              console.log(err);
              alert("file");
          }
          else{
            var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'travelend1234@gmail.com',
          pass: 'travelend'
        }
      });
      
      var mailOptions = {
        from:'travelend1234@gmail.com',
        to: user.email,
        subject:"your ticket",
       
        text:"Your Name:"+name+"\n"+"No of Rooms:"+rooms+"\n"+"Total no of Person:"+person+"\n"+"Booking date"+bdate+"\n"+"No of days"+days+"\n\n\n"+"Thank you for booking" ,
         };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error,"errrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
          }
        });
       
     
      
      
    
  })