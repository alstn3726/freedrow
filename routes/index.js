const session = require('./session');
const crypto = require('crypto');
const client = require('./mysql');
const express = require('express');

const router = express.Router();

router.use(session);
/* GET home page. */
router.get('/',(req,res)=>{
  console.log('메인페이지');
  console.log(req.session);
  client.query('select * from main_notice order by board_num desc limit 5',(err,rdata)=>{
    console.log('data :',rdata);
    res.render('index',{
      rdata:rdata,
      logined : req.session.userid,
    });
  });
});
//로그아웃
router.get('/logout',(req,res)=>{
  console.log('로그아웃 성공');
  req.session.destroy(function(err){
    res.send("<script>alert('로그아웃!');location.replace('/');</script>");
  });
});

//검색




module.exports = router;
