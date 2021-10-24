import express from 'express';
import { createworkout, Login, Register } from '../controllers/control.js';
import  jwt from 'jsonwebtoken';


const router = express.Router();
//authondication
function authenticate(req, res, next) {
    try {
    // Check if the token is present
    // if present -> check if it is valid
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization,process.env.JWT_SECRET,function(error,decoded){
            if(error){
                res.status(500).json({
                    message: "Unauthorized"
                })
            }else{
                console.log(decoded)
                req.userid = decoded.id;
            next()
            }
            
        });
      
    }else{
        res.status(401).json({
            message: "No Token Present"
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
  }


router.post('/register',Register)
router.post('/login',Login)
router.post('/createData',[authenticate],createworkout);

export default router;