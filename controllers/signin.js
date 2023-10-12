export class signinController {
    static async renderSignin(req,res){
        res.render("signin")
    }
    static async collectLogin(req,res){
        const data = req.body
        res.json(data)
    }   
}