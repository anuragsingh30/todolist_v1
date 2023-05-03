const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();
let items=[];
app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true}); 

const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"welcome to your todolist!"
});

const item2=new Item({
    name:"hit the + button to add a new item"
});

const item3=new Item({
    name:"<-- Hit this to delete an item."
});

const defaultItem=[item1,item2,item3];

// Item.insertMany(defaultItem,function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("successfully saved default item to DB");
//     }
// });  //older version supported

// try{
//     const result=await Model.insertMany(defaultItem);
//     console.log(result);
// } catch(err){
//     console.error(err);
// }

Item.insertMany(defaultItem)
.then(result => {
    console.log(result);
})
.catch(err=>{
    console.error(err);
});

app.get("/", function(req,res){

    Item.find({}, function(err,foundItems){
        res.render("list", {listTitle:"Today", newListItems: items});
    });

    
});

app.post("/",function(req,res){
    const item=req.body.newItem;
    items.push(item);
    
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});













app.get("/about",function(req,res){
    res.send("my name is  anutag singh and i am studing in kiit ")
})