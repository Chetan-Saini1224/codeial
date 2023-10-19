module.exports.setFlash = function(req,res,next)
{
    //why connect-flash?
    //because it store it in the cookie and let go on next time
    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}


//impppppppppppp......

//Using express-session to implement flash messages is a valid approach, 
//but connect-flash provides a more convenient and flexible way to manage flash messages. 
//The connect-flash middleware adds a req.flash method that can be used to store and retrieve flash messages, 
//and it handles clearing flash messages from the session automatically. 
//This can simplify your code and make it easier to manage flash messages across multiple routes and requests.