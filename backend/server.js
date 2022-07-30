var express = require('express');
var path = require('path');
var multer = require('multer');
var db = require('./database')
const bcrypt = require('bcrypt');
const PORT = 8080;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://kahn12345678:jcOrrxeQpD7GEhLD@HoLimBlog.0az2pzu.mongodb.net/?retryWrites=true&w=majority";

var app = express();
app.listen(process.env.PORT || PORT, function() {
	console.log(`started listen port ${PORT}`);
});
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.send("test");
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/public/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.post('/signin', function (req, res) {
  var username=req.body.username;
  var password=req.body.password;
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = { username: username };
    dbo.collection("authme").find(query).toArray(function(err, result) {
      if(err){
        res.send({status: 'error',content: 'Không tìm thấy tài khoản!'})
      }
      if(result[0]){         
        var account = result;
        var passwordHashed = result[0].password;
        bcrypt.compare(password, passwordHashed).then(function(result) {
            if(result){
              res.send(account);
            }
            else{
              res.send({status: 'error',content: 'Sai mật khẩu!'})
            }             
        });
      }
      else if(!result[0]){
        res.send({status: 'error',content: 'Không tìm thấy tài khoản!'})
      }
    });
  });
});

app.post('/deleteblog',function(req,res){
  var id = req.body.id;
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = { id: id };
    var newdata = { $set: {state: '0'}};
    dbo.collection("blog").updateOne(query,newdata, function(err, result) {
      if(err){
        return res.send({status: 'error',content: 'Có lỗi khi xóa bài viết'});
      }
      else{
        return res.send({status: 'success',content: 'Đã xóa bài viết thành công'});
      }
    });
  });
});

app.post('/restoreblog',function(req,res){
  var id = req.body.id;
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = { id: id };
    var newdata = { $set: {state: '1'}};
    dbo.collection("blog").updateOne(query,newdata, function(err, result) {
      if(err){
        return res.send({status: 'error',content: 'Có lỗi khi xóa bài viết'});
      }
      else{
        return res.send({status: 'success',content: 'Đã xóa bài viết thành công'});
      }
    });
  });
});

app.get('/getblogs', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = {state: '1'};
    var mySort = {date: -1};
    dbo.collection("blog").find(query).sort(mySort).toArray(function(err, result) {
      if(err){
        console.log(err);
      }
      if(!result[0]) {
        db.close();
        return res.send(result);          
      }
      else{     
        db.close();    
        return res.send(result);
      }
    });
  });
});
app.get('/getdeletedblogs', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = {state: '0'};
    var mySort = {date: -1};
    dbo.collection("blog").find(query).sort(mySort).toArray(function(err, result) {
      if(err){
        console.log(err);
      }
      if(!result[0]) {
        db.close();
        return res.send(result);          
      }
      else{     
        db.close();    
        return res.send(result);
      }
    });
  });
});

app.get('/getblogsdetail', function (req, res) {
  var id = req.query.id;
  MongoClient.connect(url, function(err, db) {
    var dbo = db.db("HoLimBlog");
    var query = { id: id };
    dbo.collection("blog").find(query).toArray(function(err, result) {
      if(err){
        console.log(err);
      }
      if(!result[0]) {
        db.close();
        return res.send(result);          
      }
      else{     
        db.close();    
        return res.send(result);
      }
    });
  });
});

//Write Blog
//Upload Img File

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "public/img/blog")
  },
  filename: function (req, file, cb) {
    var fileName = file.fieldname + "-" + Date.now()+".jpg";
    cb(null, fileName)
  }
})

const maxSize = 10 * 1000 * 1000;

var upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null,true); 
      }
      cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
    } 
}).single("image");       

app.post('/uploadImage', function (req, res, next) {
  upload(req,res,function(err) {
      if(err) {
        res.send({status: 'error', content: 'Lỗi khi đăng hình ảnh'})
      }
      else {
        res.send({status: 'valid', content: req.file.filename})
      }
  })
});
//Upload Img File
app.post('/writeblog', function (req, res, next) {
  var idTitle = req.body.idTitle;
  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;
  var date = req.body.date;
  var author = req.body.author;
  var imageName = req.body.imageName;

  title.length<10 ? res.send({status: 'error', content: 'Tiêu đề phải lớn hơn 10 chữ'}) :
  content.length<255 ? res.send({status: 'error', content: 'Nội dung phải lớn hơn 255 chữ'}) :
  category.length == 0 ? res.send({status: 'error', content: 'Hãy chọn thể loại'}) :
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("HoLimBlog");
      var query = { id: idTitle, title: title, content: content, category: category,author: author, date: date, image: imageName, state: '1'};
      dbo.collection("blog").insertOne(query,function(err, result) {
        if(err){
          res.send({status: 'error', content: 'Lỗi khi đăng blog'})
        }
        else{
          res.send({status: 'valid', content: 'Đăng blog thành công'})
        }
      });
    });
});
//Write Blog
app.post('/editblog', function (req, res, next) {
  var idTitle = req.body.idTitle;
  var idOld = req.body.idOld;
  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;

  title.length<10 ? res.send({status: 'error', content: 'Tiêu đề phải lớn hơn 10 chữ'}) :
  content.length<255 ? res.send({status: 'error', content: 'Nội dung phải lớn hơn 255 chữ'}) :
  category.length == 0 ? res.send({status: 'error', content: 'Hãy chọn thể loại'}) :
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("HoLimBlog");
      var query = { id: idOld};
      var newdata = {$set:{id: idTitle, title: title, content: content, category: category}}
      dbo.collection("blog").updateOne(query,newdata,function(err, result) {
        if(err){
          res.send({status: 'error', content: 'Lỗi khi sửa blog'})
        }
        else{
          res.send({status: 'valid', content: 'Sửa blog thành công'})
        }
      });
    });
});
