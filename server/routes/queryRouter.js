import express from 'express'
import {postQuery} from '../controllers/dataController.js';
const router = express.Router();

/* GET data */
router.post('/', postQuery);


export {router as queryRouter};