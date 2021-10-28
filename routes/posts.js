import express from 'express';
import { createBmi, createworkout, deletePost, editbmi, editworkout, getbmiedit, getworkout, getworkout_edit, Login, Register } from '../controllers/control.js';
import  jwt from 'jsonwebtoken';
import admincheck from '../Authenticate/Admin.js';
import { Alluser, makeadmin } from '../controllers/AdminControl.js';



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
router.get('/getalluser',[authenticate],[admincheck],Alluser)
router.post('/createData',[authenticate],createworkout);
router.post('/createbmi',[authenticate],createBmi);
router.post('/makeadmin',[authenticate],[admincheck],makeadmin);
router.get('/getData',[authenticate],getworkout);
router.get('/getData/:id',[authenticate],getworkout_edit);
router.get('/getbmiedit/:id',[authenticate],getbmiedit);
router.put('/editData/:id',[authenticate],editworkout);
router.put('/editbmi/:id',[authenticate],editbmi);
router.delete('/deletData/:id',[authenticate],deletePost);



export default router;