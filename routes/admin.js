const session = require('./session');
const client = require('./mysql');
const express = require('express');
const path = require('path');
const router = express.Router();

router.use(session);



//admin list 페이지
router.get('/list',(req,res)=>{
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        res.render('admin/list');
    }
})
//개인 기록실 list
router.get('/score_list',(req,res)=>{
    const body = req.body;
    console.log('어드민 리스트');
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        client.query('select * from player order by team asc',(err,data)=>{
            console.log('스코어보드 data');
            console.log('data==>',data);
            res.render('admin/score_list',{
                data: data,
                logined : req.session.userid,
            });
        })
    }
});
//개인 기록실 update get
router.get('/score_update/:name',(req,res)=>{
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        console.log('수정 페이지 진행');
        client.query('select * from player where name=?',[req.params.name],(err,data)=>{
            console.log(err);
            console.log('data ==>',data);
            res.render('admin/score_update',{
                data : data[0],
                logined : req.session.userid,
            })
        })   
    }
});
//개인 기록실 update post
router.post('/score_update/:name',(req,res)=>{
    console.log('스코어보드 post');
    const body = req.body;
    console.log(req.body);
    client.query('update player set pts=?,reb=?,ast=?,stl=?,blk=?,twopt=?,threept=?,tov=? where name=?',
    [body.pts, body.reb, body.ast, body.stl, body.blk, body.twopt, body.threept, body.tov, req.params.name],(err,data)=>{
        console.log(err);
        console.log('post 되는거냐?');
        console.log('data',data);
        res.send("<script>location.replace('/admin/score_list');</script>");
        
    })
})

//팀 추가 get
router.get('/team_update',(req,res)=>{
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        console.log('삽입 페이지');
        res.render('admin/team_update', {
            logined : req.session.userid,
        });
    }
});
//팀 추가 post
router.post('/team_update',(req,res)=>{
    const body = req.body;
    console.log('팀 추가 포스트 진행중');
    client.query('insert into team (team)values(?)',[body.team],()=>{
        console.log('팀추가 성공');
        res.send("<script>location.replace('/');</script>");
    })
})

//팀 기록실 list
router.get('/teamscore_list',(req,res)=>{
    const body = req.body;
    console.log('어드민 리스트');
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        client.query('select * from team ',(err,data)=>{
            console.log('스코어보드 data');
            console.log('data==>',data);
            res.render('admin/teamscore_list',{
                data: data,
                logined : req.session.userid,
            });
        })
    }
});

//팀 기록실 update get
router.get('/teamscore_update/:team',(req,res)=>{
    if(req.session.userid != 'admin'){
        res.send("<script>alert('권한이 없습니다.');location.replace('/');</script>")
    }else{
        console.log('수정 페이지 진행');
        client.query('select * from team where team=?',[req.params.team],(err,data)=>{
            console.log(err);
            console.log('data ==>',data);
            res.render('admin/teamscore_update',{
                data : data[0],
                logined : req.session.userid,
            })
        })   
    }
});
//팀 기록실 update post
router.post('/teamscore_update/:team',(req,res)=>{
    console.log('스코어보드 post');
    const body = req.body;
    console.log(req.body);
    client.query('update team set pts=?,reb=?,ast=?,stl=?,blk=?,twopt=?,threept=?,tov=? where team=?',
    [body.pts, body.reb, body.ast, body.stl, body.blk, body.twopt, body.threept, body.tov, req.params.team],(err,data)=>{
        console.log(err);
        console.log('post 되는거냐?');
        console.log('data',data);
        res.send("<script>location.replace('/admin/teamscore_list');</script>");
        
    })
})
















module.exports = router;
