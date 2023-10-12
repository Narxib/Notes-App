import express,{json} from "express"
import { notesRoutes } from "./routes/notes.js"
import { notesApiRoutes } from "./routes/API/notesAPI.js"
import { signinRouter } from "./routes/signin.js"
import { signupRouter } from "./routes/signup.js"
import { usersRouter } from "./routes/users.js"
import { logoutRouter } from "./routes/logout.js"
import path from "path"
import { fileURLToPath } from 'url'
import "./passport/local-auth.js"
import session from "express-session"
import passport from "passport"
import flash from "connect-flash"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.set("view engine","pug")
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("styles"))
app.use(session({
    secret:"secreto",
    resave:false,
    saveUninitialized:false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
   app.locals.signupMessage = req.flash("signupMessage");
   app.locals.signinMessage = req.flash("signinMessage");
   app.locals.deleteNoteMessage = req.flash("deleteNoteMessage");
   app.locals.createNoteMessage = req.flash("createNoteMessage");
   app.locals.updateNoteMessage = req.flash("updateNoteMessage")
   next(); 
})


export function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/notes")
}

app.use("/" , notesRoutes)
app.use("/signin", signinRouter)
app.use("/signup", signupRouter)
app.use("/users", usersRouter)
app.use("/logout",logoutRouter)
app.use("/api", notesApiRoutes)

let PORT = process.env.PORT || 1234

app.listen(PORT,(req,res)=>{
    console.log(`Server started at http://localhost:${PORT}`)
})