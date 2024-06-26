import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import {dirname} from "path";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var posts=[];

function Post(author,title,content,date){
  this.author=author;
  this.title= title;
  this.content = content;
  this.date = date;
}


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log("Listening on port: "+port);
})
app.get("/", (req, res) => {
  res.render("index.ejs",{
    posts:posts
  });
  
});

app.get("/aboutme",(req,res)=>{
    res.render("aboutme.ejs");
})

app.get("/post",(req,res)=>{
  res.render("post.ejs");
})

app.post("/post",(req,res)=>{
  var postTitle = req.body["postTitle"];
  var postContent = req.body["postContent"];
  sharePost(postTitle,postContent);
  res.redirect("/");
})

function sharePost(title,content){
  var post = new Post("Emre Yildiz",title,content,getTodayDate());
  posts.push(post);
}

function deletePost(){

}
function updatePost(){
    
}

function getTodayDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; 
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}