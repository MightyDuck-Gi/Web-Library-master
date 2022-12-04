const userRouter = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = require("./book-routes");
const auth = require("../middleware/auth");
const asynHandler = require('express-async-handler');
const cookie = require('cookie');
/*//==================================================\\
        This is the register router
*/
userRouter.post("/", async (req, res) => {
    try{//to created user, it will need these feilds as request to 
        const { email, password, passwordVerify } = req.body;

        //this will be validatoin to not crash backend
        if(!email || !password || !passwordVerify) {
            return res.status(400).json({ errorMessage: "Please enter all required field"});
        };

        if(password.length < 6 )  {
            return res.status(400).json({ errorMessage: "Please enter a stronger password"});
        };
        
        if(password !== passwordVerify ) {
            return res.status(400).json({ errorMessage: "Please enter matching password"});
       };
       //once passed validatoins, it will save user to db
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                errorMessage: "Email already exists"
            });
        };
        //This hashes the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //Save user to database
        const newUser = new User({
            email, passwordHash
        });
        const savedUser = await newUser.save();
        
        //Sign the token
        const token = jwt.sign({
            user: savedUser._id,
            login: true,
        },
        "" + process.env.JWT_KEY
            );
        //Send the token 
        res.json(token).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    };
});
/*//==================================================\\
    This is the login router
*/
userRouter.post("/login", async(req, res) => {
    try {//these fields will be pass in order to validate 
        const { email, password } = req.body;

        //This will be validation to check input
        if(!email || !password ) {
            return res.status(400).json({ errorMessage: "Please enter all required field"});
        };

        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(401).json({ errorMessage: "Wrong email or password"});
        };

        const passworCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if(!passworCorrect) {
            return res.status(401).json({ errorMessage: "Wrong email or password"});
        };
         /*//==================================================\\
            once the user is validated it will get signed a token
        */
         const token = jwt.sign({
             user: existingUser._id,
             login: true,
             role: existingUser.role
        },
        "" + process.env.JWT_KEY
            );
        
        res.setHeader("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: "/",
        }))
        //Send token 
        res.json(token).send();
    } catch(err){
        console.error(err);
        res.status(500).send();
    };
});
/*//==================================================\\
    This will delete and reset the cookie
*/
userRouter.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
});
/*//==================================================\\
    This is a router to cheeck if the yser is logged in
*/
userRouter.get("/loggedIn", (req, res) => {
    try {// this router will check if the user is logged in
        const token = req.cookies.token;

        if(!token) return res.json(false);
        
        jwt.verify(token, "" + process.env.JWT_SECRET);
        
        res.send(true);

    } catch (err) {
        console.error(err);
        res.json(false);
    };
});
/*//==================================================\\
    This is a router to assossicate the user with which
        book he has signed himself to
*/
userRouter.get("/profile", auth, asynHandler(async (req, res) => {
    try {//this router will populate the books area, which user created it
        const user = await User.findById(req.user).populate("books");
        
        if(!user) throw new Error("no profile yet");
         res.status(200);

        res.send(user);
    } catch (err) {
        res.status(500);
        throw new Error("Server")
    };
}));
/*//==================================================\\
    This is a router to get the users send as result
*/
userRouter.get("/users", async (req, res) => {
    User.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    }) 
});
/*//==================================================\\
    This is a router to put new user data send as request
*/
userRouter.put("/update", async (req, res) => {
    const newRole = req.body.newRole;
    const id = req.body.id;
    try {
        await User.findById(id, (error, userToUpdate) => {
            userToUpdate.role = String(newRole);
            userToUpdate.save();
        })
    } catch (err) {
        console.error(err);
    }
    res.send("Updated")
});
/*//==================================================\\
    This is a router to remove user data from db
*/
userRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();
    res.send("item deleted");
})  

module.exports = userRouter;