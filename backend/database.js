var mysql = require('mysql');

exports.mydatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myblogproject'
});

exports.conn = function(){
    return mydatabase.connect(function(err){
        if(err) throw err
        console.log("Database Connected");
    });
};

// mydatabase.connect(function(err){
//     if(err) throw err
//     var sql = 'SELECT * FROM authme';
//     mydatabase.query(sql,function(err,result,field){
//         if (err) throw err
//         console.log(result);
//     });        
// });
