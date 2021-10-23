import express from 'express';
import { getPost } from '../controllers/getLog.js';
import {createPost} from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost)
router.get('/get',getPost)


export default router;