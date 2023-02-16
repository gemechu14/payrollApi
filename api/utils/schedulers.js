const mongoose =require('mongoose');
const app=require('express');

const router=app.Router();
router.get('/',async( req,res,next)=>{
    cron.schedule('* * * * *', async function (req, res, next) { 
        let today_date = moment(new Date()).format("YYYY-MM-DD hh:mm");
        const find_users = await User.find()
        if (find_users) {
            for (let i = 0; i < find_users.length; i++) {
                let users = find_users[i];
                //format user date to same format as today date then compare
                let userDueDate = moment(users.next_payment_date).format("YYYY-MM-DD hh:mm");
                if (today_date === userDueDate && today_date>userDueDate) {
                  console.log(today_date>userDueDate);
                    let find_user = await User.findById(users._id);
                    find_user.isPaid = false;
                    find_user.next_payment_date=null;
                    find_user.startDate=null;
    
                    find_user.save()
                }
            }
        }
    })
    
})
module.exports=router;