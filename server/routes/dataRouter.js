import express from "express"

const router = express.Router();

/* GET data */
router.get('/', getData);

router.get('/', getQuery);



export {router as dataRouter};