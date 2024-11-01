import express from "express"

const router = express.Router();

router.get('/', getData)

router.get('/', getQuery)

export {router as dataRouter};