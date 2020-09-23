const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdemo_app_2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var Post = require("./models/posts");
var User = require("./models/users");



//================POST- title , content========================
// var postSchema = new mongoose.Schema({
// 	title: String ,
// 	content: String
// });

// var Post = mongoose.model("Post" , postSchema);





//================USER -EMAIL AND NAME==========================
// var userSchema = new mongoose.Schema(
// {
// 	email: String,
// 	name: String,
// 	//==========================++++++++++++++++++++++++++++++++++
// 	posts:[
// 		{
// 		 type: mongoose.Schema.Types.ObjectId ,
// 		 ref: "Post"
// 		}
// 	]
// });

// var User = mongoose.model("User" , userSchema);


// Post.create({
// 	title:"make something part 4",
// 	content:" this is finally  when i say whatever again"
// } , function(err , post){
// 	User.findOne({email:"bob@123"} , function(err, foundUser){
// 	if(err){
// 		console.log("error");
// 	} else{
// 		foundUser.posts.push(post);
// 		foundUser.save(function(err , data){
// 			if(err){
// 				console.log("++++++++++++++++++++error++++++++++++++++");
// 			}else{
// 				console.log(data);
// 			}
// 		})
		
// 	}
		
// 	})

// });

// User.create({
// 	email:"bob@123",
// 	name:"bob bschman"
// });

//================= FIND USER=====================

//find user 
//find all posts for that user

// User.findOne({email:"bob@123",}).populate("posts").exec(function(err , user){
// 	if(err){
// 		console.log("error");
// 	} else{
// 		console.log(user);
// 	}
// })















