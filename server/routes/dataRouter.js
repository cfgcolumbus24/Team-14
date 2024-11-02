import express from "express"
import {getData} from "../controllers/dataController"
const router = express.Router();

/* GET data */
router.get('/', getData);

export {router as dataRouter};