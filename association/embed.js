const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdemo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//================POST- title , content========================
var postSchema = new mongoose.Schema({
	title: String ,
	content: String
});

var Post = mongoose.model("Post" , postSchema);

//================USER -EMAIL AND NAME==========================
var userSchema = new mongoose.Schema(
{
	email: String,
	name: String,
	//==========================++++++++++++++++++++++++++++++++++
	posts:[postSchema]
});

var User = mongoose.model("User" , userSchema);



// var newUser = new User({
// 	email: "mimi3@gmal.com",
// 	name: "mimi singh"
// });


// newUser.posts.push({
// 	title:"how to grow apples",
// 	content:"just take care of ue self pal"
// });

// newUser.save(function(err , user){
// 	if(err){
// 		console.log("error");
// 	} else{
// 		console.log(user);
// 	};
// });

// var newpost = new Post({
// 	title: "dogs",
// 	content:"they are the nicest"
// });
// newpost.save(function(err , post){
// 	if(err){
// 		content.log("error");
// 	} else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"mimi singh"} , function(err , user){
	if(err){
		console.log("error");
	} else{
		
		user.posts.push({
			title: "catss",
			content:"they are a"
		});
		user.save(function(err , user){
			if(err){
				console.log("err");
			} else{
				console.log(user);
			}
		})	
	}
});





















