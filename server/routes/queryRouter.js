import express from 'express'
import {getQuery} from '../controllers/dataController';
const router = express.Router();

/* GET data */
router.get('/', getQuery);


export {router as queryRouter};