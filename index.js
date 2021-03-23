const mysql=require('mysql');
const express=require('express');
var app=express();
var port=8080;
const { response } = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))
app.use(bodyParser.json({ type: 'application/form-data' }))
var mysqlConnection=mysql.createConnection(

{

host: 'localhost',
user:'root',
password :'',
database: 'postdb'


});
mysqlConnection.connect((err)=>
{
if(!err) console.log('connected');
else console.log('failed'+JSON.stringify(err,undefined,2));


});
app.listen(3000,()=>console.log('Express server is running at port : 3000'));

app.get('/users',(req,res)=>{
    mysqlConnection.query('SELECT * FROM user',(err,row,fields)=>{
 if(row==0)
{
    res.status(404).send({message:'no user yet'})
}
else if(!err)
{
    res.status(200).send(row)
}
else 
{
    res.status(404).send({message:'Error'})
}
})});

app.get('/users/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM user WHERE uid=?',[req.params.id],(err,row,fields)=>{
        if(row==0)
        {
            res.status(404).send({message:'no such user'})
        }
        else if(!err)
        {
            res.status(200).send(row)
        }
        else 
        {
            res.status(404).send({message:'Error'})
        }
})});

app.delete('/users/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM user WHERE uid=?',[req.params.id],(err,row,fields)=>{
        
         if(!err)
        {
            res.status(200).send({message:'Deleted'})
        }
        else 
        {
            res.status(404).send({message:'Error'})
        }
})});

app.post('/users',(req,res)=>{
    var name=req.body.name;
    var username=req.body.username;
    var password=req.body.password;
//var sql="INSERT INTO user SET name=?,username=?,password=?";
              
    mysqlConnection.query("INSERT INTO user (name,username,password) VALUES(?,?,?)",[name,username,password],(err)=>{
        
         if(!err)
        {
            res.status(201).send({message:'created'})
        }
        else 
        {
            console.log(err);
            res.status(404).send({message:'Error'})
        }
})});

app.put('/users',(req,res)=>{
    var name=req.body.name;
    var username=req.body.username;
    var password=req.body.password;
    var uid=req.body.uid;
//var sql="INSERT INTO user SET name=?,username=?,password=?";
             
    mysqlConnection.query("UPDATE `user` SET `name`=?,`username`=?,`password`=? WHERE `uid`=?",[name,username,password,uid],(err)=>{
        
         if(!err)
        {
            res.status(200).send({message:'updated'})
        }
        else 
        {
            console.log(err);
            res.status(404).send({message:'Error'})
        }
})});