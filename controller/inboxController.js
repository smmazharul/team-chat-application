// get login page 
function getInbox(req,res,next){
    res.render('inbox',{
        title:'inbox - Chat Application'
    });

}

module.exports = {
    getInbox,
}