const session = require('./session');
const client = require('./mysql');
const express = require('express');
const router = express.Router();

router.use(session);

//search team list 페이지
router.get('/',(req,res)=>{
    const body = req.body;
    client.query('select * from team',(error, tdata) => {
        console.log('team list 드가는중');
        console.log('data=>>',tdata);
        res.render('search/team', { 
            tdata: tdata,
            logined : req.session.userid, 
        });
    });
});

module.exports = router;