export class logoutController{
    static async getOut(req,res,next){
        console.log("Logged oput")
        req.logout((error)=>{
            if(error){
                return next(err)
            }
            res.redirect("/signin")
        });
    }
}