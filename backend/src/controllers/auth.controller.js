// login and Logout functions

import User from "../models/user.model.js"

const login = async (req,res,next) =>{
const payload = res.locals.payload
const googleId = payload['sub']

let user = await User.findOne({googleId: googleId}).exec()

if(!user){
    console.log("First sign in. Creating new user Account");
    const email = payload['email']
    const firstName = payload['given_name']
    const profilePicUrl = payload['picture']

    user = await User.create({
        googleId: googleId,
        email: email,
        firstName: firstName,
        profilePicUrl: profilePicUrl
    })
    console.log("First login. Created new user:" +user);
}

console.log("Creating session cookie with _id: "+ user._id);
req.session.userId = user._id
res.sendStatus(200)
}

const logout = (req,res,next) =>{
    req.session = null
    res.sendStatus(200)
}

export {login, logout}