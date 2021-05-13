const session = require('./session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const client = require('./mysql');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const router = express.Router();

router.use(session);
//로그인
router.get('/',(req,res)=>{
    console.log('로그인 페이지');
    res.render('login');
  });
  router.post('/',(req,res)=>{
    const body = req.body;
    const id = body.id;
    const password = body.password;
  
    // const salt = Math.round((new Date().valueOf()+Math.random())) + "";
    // const hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");
    client.query('select * from user_table where id=?',[id],(err,data)=>{
        client.query('select * from main_notice order by board_num desc limit 5',(err,rdata)=>{
        console.log(err);
        console.log('data==>',data);
        console.log('로그인 포스트');
        if(data == ""){
            console.log('ID ERROR')
            res.send("<script>alert('ID ERROR');history.back();</script>");
            //세션에 추가
        }else{
            if(req.body.id == 'admin' && req.body.password == 'alstn3726'){
            console.log('관리자 리스트 진입.');
            req.session.logined = true;
            req.session.userid = req.body.id;
            req.session.save(function(){
                res.render('admin/list',{
                    logined : req.session.userid,
                });
            });
            }else if(body.password == data[0].password){
                req.session.logined = true;
                req.session.userid = data[0].id;
                req.session.save(function(){
                    res.render('index',{
                        rdata:rdata,
                        logined : req.session.userid,
                    });
                });
            }else{
                console.log('Password ERROR');
                res.send("<script>alert('Password ERROR');history.back();</script>");
            }
        }
    });
    });
  });

  module.exports = router;

//   if(req.body.id != 'admin' && req.body.password != '12345'){
//       byebye
//   }