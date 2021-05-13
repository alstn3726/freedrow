const session = require('./session');
const client = require('./mysql');
const express = require('express');
const path = require('path');
const router = express.Router();

router.use(session);

//개인 기록실 list
router.get('/scoreboard',(req,res)=>{
    const body = req.body;
    console.log('어드민 리스트');
    client.query('select * from player order by team asc',(err,data)=>{
        console.log('스코어보드 data');
        console.log('data==>',data);
        res.render('league_score/scoreboard',{
            data: data,
            logined : req.session.userid,
        });
    })

});
//팀 기록실 list
router.get('/team_scoreboard',(req,res)=>{
    const body = req.body;
    console.log('어드민 리스트');
        client.query('select * from team ',(err,data)=>{
            console.log('스코어보드 data');
            console.log('data==>',data);
            res.render('league_score/team_scoreboard',{
                data: data,
                logined : req.session.userid,
        });
    })
});

module.exports = router;