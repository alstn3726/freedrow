const session = require('./session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const client = require('./mysql');
const express = require('express');

const router = express.Router();

router.use(session);
//회원가입
router.get('/',(req,res)=>{
    client.query('select * from team',(err,data)=>{
        res.render('signup',{
            data:data,
        })
        console.log('회원가입');
    })
 
  });
  router.post('/', (req,res,next)=>{
    console.log('회원가입 중');
    const body = req.body;
    const id = body.id;
    const password = body.password;
    const name = body.name;
    const phone = body.phone;
    const email = body.email;
    const team = body.team;
    const image = body.image;

    client.query('select * from user_table where id=?',[id],(err,data)=>{

        if(data.length == 0){
            console.log('회원가입 성공');
            client.query('insert into user_table(id,name,email,password,phone,team)values(?,?,?,?,?,?)',
            [id, name, email, password, phone, team,],()=>{
                client.query('insert into player (name,team)values(?,?)',[name,team]);
                res.redirect('./login');
            });
        }else{
            console.log('회원가입 실패');
            res.redirect('./signup')
        }
    });
  });

  

router.post('/checkId', (req, res) =>{
      let input_id = req.body.data;
      client.query('select * from user_table where id=?',[input_id],(err,data)=>{
          console.log(err);
          console.log('data ==>',data);

          if(data.length == 0){
              res.send({result:true});
              console.log('사용 가능 ID');
          }else{
              res.send({result:false});
              console.log('사용 불가 ID');
          }
      });
  });

router.post('/checkEmail', (req, res) =>{
    let input_email = req.body.data;
    client.query('select * from user_table where email=?',[input_email],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);

        if(data.length == 0){
            res.send({result:true});
            console.log('사용 가능 Email');
        }else{
            res.send({result:false});
            console.log('사용 불가 Email');
        }
    });
});

module.exports = router;