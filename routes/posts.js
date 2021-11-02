import express from 'express';
import { createBmi, createworkout, deletePost, editbmi, editworkout, forgotPassword, getbmiedit, getworkout, getworkout_edit, Login, Register, resetpassword, workout_type } from '../controllers/control.js';
import admincheck from '../Middleware/Admin.js';
import { Alluser, delete_workout, makeadmin, removeadmin, workout, Workout_edit, workout_id } from '../controllers/AdminControl.js';
import authenticate from '../Middleware/Usercheck.js';



const router = express.Router();



router.post('/register',Register);
router.post('/login',Login);
router.post('/forgetpassword',forgotPassword)
router.get('/getalluser',[authenticate],[admincheck],Alluser);
router.post('/createData',[authenticate],createworkout);
router.post('/createbmi',[authenticate],createBmi);
router.post('/makeadmin',[authenticate],[admincheck],makeadmin);
router.post('/removeadmin',[authenticate],[admincheck], removeadmin);
router.post('/workout',[authenticate],[admincheck],workout);
router.get('/allworkout',[authenticate],workout_type);
router.get('/getData',[authenticate],getworkout);
router.get('/getData/:id',[authenticate],getworkout_edit);
router.get('/getworkout/:id',[authenticate],[admincheck],workout_id);
router.get('/getbmiedit/:id',[authenticate],getbmiedit);
router.put('/editData/:id',[authenticate],editworkout);
router.put('/editworkout/:id',[authenticate],Workout_edit);
router.put('/editbmi/:id',[authenticate],editbmi);
router.delete('/deletData/:id',[authenticate],deletePost);
router.delete('/deleteworkout/:id',[authenticate],[admincheck],delete_workout);
router.post('/:userId/:token',resetpassword);



export default router;