const session = require('./session');
const client = require('./mysql');
const express = require('express');
const path = require('path');
const router = express.Router();
const moment = require('moment');
const multer = require('multer');
const sharp = require('sharp')
router.use(session);

//이미지 업로드
const dstorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.dirname(__dirname) + '/public/images/upload')
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().valueOf() + '_' + file.originalname)
    },
    limit: { fileSize: 5 * 2048 * 2048 },
});

const upload = multer({ storage: dstorage });

//게시판 삽입 페이지
router.get('/write',(req,res)=>{
    if(req.session.userid == undefined) {
        res.send("<script>alert('로그인이 필요합니다.');location.replace('/login');</script>");
    }
    console.log('삽입 페이지');
    res.render('shop_board/write', {
        logined : req.session.userid,
    });
});

//게시판 삽입 POST (썸머노트 이미지 업로드)
router.post('/upload', upload.single('files'), (req, res) => {
    console.log('이미지 post 진행중')
    const body = req.body;
    console.log(req.file);

    if(req.file ==  undefined) {
        client.query('insert into shop_m_board (board_id,subject,content,reg_date) values(?,?,?,?)', 
        [req.session.userid, body.subject, body.content, new Date(),], () => { 
            console.log("게시글 데이터 삽입 - 이미지 없음");
            res.redirect('1');
        });
    }
    else {
        sharp(req.file.path).resize({width:150, height:150, position:"center"})
        .toFile(path.dirname(__dirname) + '/public/images/picture/'+req.file.filename)
        client.query('insert into shop_m_board (board_id,subject,content,reg_date,image) values(?,?,?,?,?)', 
        [req.session.userid, body.subject, body.content, new Date(), req.file.filename], (err, result) => { 
            if(err) {
                console.log(err);
            }
            console.log("게시글 데이터 삽입");
            res.redirect('1');
        });
    }
});

//게시판 list 페이징
router.get('/:num',(req,res,next)=>{
    console.log(req.params.num);
    let page=req.params.num;
    client.query('select * from shop_m_board order by board_num desc ', (error, data) => {
        res.render('shop_board/list', { 
            data: data,
            page:page,
            leng:data.length-1,
            page_num:10,
            logined : req.session.userid, 
            moment : moment,
        });
    });
});

//게시판 detail 페이지, 댓글 list
router.get('/detail/:board_num',(req,res)=>{
    console.log('상세보기 진행');
    console.log(req.session);
    client.query('select * from shop_m_board where board_num=?',[req.params.board_num],(err,data)=>{
        console.log('댓글 list');
        client.query('select * from re_shop_m_board where parent=? order by re_num desc',[req.params.board_num],(err,rdata)=>{
        console.log(err);
        res.render('shop_board/detail',{
            data : data[0],
            rdata : rdata,
            logined : req.session.userid,
            moment : moment,
            })
        })
    });
    //조회수 기능
    client.query('update shop_m_board set hit=hit+1 where board_num=?',[req.params.board_num]); 
});



//게시판 수정 페이지
router.get('/update/:board_num',(req,res)=>{
    if(req.session.userid == undefined) {
        res.send("<script>alert('로그인이 필요합니다.');location.replace('/login');</script>");
    }
    console.log('수정 페이지 진행');
    client.query('select * from shop_m_board where board_num=?',[req.params.board_num],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);
        res.render('shop_board/update',{
            data : data[0],
            logined : req.session.userid,
        })
    })
});
//게시판 수정 post
router.post('/update/:board_num',(req,res)=>{
    console.log('수정 포스트 진행');
    const body = req.body;
    
    client.query('update shop_m_board set subject=?, content=? where board_num=?',
    [body.subject, body.content, req.params.board_num],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);
        res.send("<script>location.replace('/shop_board/list/1')</script>");
    })
})

//게시판 삭제
router.get('/delete/:board_num',(req,res)=>{
    console.log('삭제 진행');
    client.query('delete from shop_m_board where board_num=?',[req.params.board_num],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);
        res.send("<script>location.replace('/shop_board/list/1')</script>");
    });
});

//댓글


//게시판 댓글 write post 
router.post('/detail/:board_num',(req,res)=>{
    console.log('댓글 삽입 post')
    console.log(req.session);
    const body = req.body;
    client.query('insert into re_shop_m_board(parent,re_id,re_content,re_date)values(?,?,?,?)',
    [req.params.board_num, req.session.userid, body.re_content, new Date()],(err,data)=>{
        console.log('삽입');
        res.redirect(req.params.board_num);
    });
});

//게시판 댓글 delete
router.get('/redelete/:board_num',(req,res)=>{
    console.log('댓글삭제 진행');
    client.query('delete from re_shop_m_board where re_num=?',[req.params.board_num],(err,rdata)=>{
        console.log(err);
        console.log('data ==>',rdata);
        res.send("<script>location.replace('/shop_board/list/1')</script>");
    });
});

//게시판 댓글 update 페이지
router.get('/re_update/:re_num',(req,res)=>{
    console.log('수정 페이지 진행');
    client.query('select * from re_shop_m_board where re_num=?',[req.params.re_num],(err,data)=>{
        console.log(err);
        res.render('shop_board/re_update',{
            data : data[0],
            logined : req.session.userid,
        })
    })
});

//게시판 댓글 update POST
router.post('/re_update/:re_num',(req,res)=>{
    console.log('수정 포스트 진행');
    const body = req.body;
    
    client.query('update re_shop_m_board set re_content=? where re_num=?',
    [body.re_content, req.params.re_num],(err,data)=>{
        console.log('data',body.re_content);
        console.log(err);
        res.send("<script>location.replace('/shop_board/list/1')</script>");
    })
})


module.exports = router;
