// get login page 
function getUsers(req,res,next){
    res.render('users',{
        title:'users - Chat Application'
    });

}

module.exports = {
    getUsers,
}