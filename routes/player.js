const session = require('./session');
const client = require('./mysql');
const express = require('express');
const router = express.Router();

router.use(session);

//search team list 페이지
router.get('/',(req,res)=>{
    client.query('select * from user_table',(error, tdata) => {
        console.log('team list 드가는중');
        console.log('data=>>',tdata);
        res.render('search/player', { 
            tdata: tdata,
            logined : req.session.userid, 
        });
    });
});

module.exports = router;