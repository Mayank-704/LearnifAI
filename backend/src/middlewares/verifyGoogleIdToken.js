import {OAuth2Client} from "google-auth-library"
const client = new OAuth2Client(process.env.SERVER_GOOGLE_CLIENT_ID)

const verifyGoogleIdToken = (req,res,next)=>{
    const idToken = req.headers.authorization.split(" ")[1]
    console.log("recieved idToken: "+ idToken);
    async function verify() {
        const ticket = client.verifyIdToken({
            idToken: idToken,
            audience: [process.env.EXTENSION_GOOGLE_CLIENT_ID, process.env.WEB_GOOGLE_CLIENT_ID]
        })
        res.locals.payload = ticket.getPayload()
    }

    verify().then(()=>{
        next()
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({error: err})
    })
}


const isLoggedIn = (req,res,next) => {
    const userId = req.session.userId 
    console.log("recieved cookie userId: "+ userId);

    if(userId){
        next()
    }else{
        return res.status(401).json({
            error: "No session cookie sent"
        })
    }
}

export {isLoggedIn, verifyGoogleIdToken}