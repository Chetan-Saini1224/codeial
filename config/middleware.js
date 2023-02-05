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