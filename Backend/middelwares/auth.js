
import jwt from "jsonwebtoken"

const {sign, verify} = jwt

export const createToken = (userId, userRole) => {
  const authToken = sign({userId,userRole}, process.env.SECRET_KEY, {expiresIn: "5d"})
  return authToken
  
}

export const userAuthValidation = (req, res, next) => {
  const authToken = req.cookies.authToken;
  console.log(authToken)
  if (!authToken) {
    // throw Error("no auth domage!");
    // remplacer throw error par res.send pour recevoir l erreur 
    // au front et non dans le server
    res.status(403).json("no auth dommage")
    return
  }
 
  const decodedToken = verify(authToken, process.env.SECRET_KEY)
  console.log({decodedToken});
  if (!decodedToken) {
    // throw Error("no auth for this action")
    // remplacer throw error par res.send pour recevoir l erreur 
    // au front et non dans le server
    res.status(403).json("no auth dommage")
    return
  }
  

  res.locals.userId = decodedToken.userId
  res.locals.role = decodedToken.userRole
  next()
}




