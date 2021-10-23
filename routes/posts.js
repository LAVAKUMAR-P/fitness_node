import express from 'express';
import {createPost, getPost} from '../controllers/posts.js';

const router = express.Router();

router.post('/', createPost)
router.get('/get',getPost)


export default router;