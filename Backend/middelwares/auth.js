
import jwt from "jsonwebtoken"

const {sign, verify} = jwt

export const createToken = (userId, userRole) => {
  const authToken = sign({userId,userRole}, process.env.SECRET_KEY, {expiresIn: "5d"})
  return authToken
  
}

export const userAuthValidation = (req, res, next) => {
  const authToken = req.cookies.authToken;
  console.log({authToken})
  if (!authToken) {
    res.status(403).json("no auth dommage")
    return
  }
 
  const decodedToken = verify(authToken, process.env.SECRET_KEY)
  // console.log({decodedToken});
  if (!decodedToken) {

    res.status(403).json("no auth dommage")
    return
  }
  

  res.locals.userId = decodedToken.userId
  res.locals.role = decodedToken.userRole
  next()
}




