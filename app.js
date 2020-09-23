var express =require("express");
var app = express();
var methodoverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.use(expressSanitizer());
//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restful-blogpost_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.set("view engine" , "ejs");
app.use(express.static("public"));

//mongoose model config
var blogSchema = new mongoose.Schema({
	title:String ,
	image: String,
	body: String,
	created:{ type:Date , default: Date.now} 
	
});

var Blog = mongoose.model("Blog" , blogSchema);

// Blog.create({
// 	title:"Sample-blog" ,
// 	image:"https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
// 	body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s "
	
// })

//restful route

//INDEX ROUTE
app.get("/",function(req,res){
	res.redirect("/blogs")
})

app.get("/blogs",function(req,res){
	Blog.find({}, function(err , blogs){
		if(err){
			console.log("error")
		} else{
			res.render("index" ,{ blogs : blogs});
			
		}
	});
	
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//cerate blogs
Blog.create(req.body.blog, function( err,newBlog){
	if(err){
		res.render("new")
	} else{
	//redirect to the index
		res.redirect("/blogs")
	}
  }); 	
});

//SHOW ROUTE
app.get("/blogs/:id" , function(req,res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs")
		} else{
			res.render("show" , {blog: foundBlog});
		}
	})
	
});

//EDIT ROUTE
app.get("/blogs/:id/edit" , function(req, res){
	Blog.findById(req.params.id , function(err , foundBlog){
		if(err){
			res.redirect("/blogs")
		} else{
			res.render("edit" , {blog: foundBlog});
		}
	});
})
//UPDATE
app.put("/blogs/:id", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id ,req.body.blog, function(err , foundBlog){
		if(err){
			res.redirect("/blogs")
		} else{
			res.redirect("/blogs/"+ req.params.id );
		}
	});

})


//DESTROY
app.delete("/blogs/:id" , function(req, res){
	//destroy
	Blog.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.redirect("/blogs")
		} else{
			res.redirect("/blogs" );
		}
	});
})

//server
app.listen(1900, function() { 
  console.log('Server listening on port 1900'); 
});