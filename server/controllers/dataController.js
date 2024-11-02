import express from "express"
import testEHR from '../../testdata/test_ehr.json' with { type: 'json' };
import { executeMongoQuery, generateMongoQuery } from "../services/langchain";

const getData = async (req, res) => {
    try {
        const type = req.query.type;
        if (type === 'EHR') {
            res.status(200).send(testEHR);
        } else if (type === 'Mytel') {
            res.send('not implemented yet');
        } else if (type === 'quickBooks') {
            res.send('not implemented yet');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
    }
}

const postQuery = async (req, res) => {
    try{
        const { query } = req.body;
        if (!query) {
            return res.status(500).json({error:"Query required"})
        }
        const mongoQuery = await generateMongoQuery(query);
        const results = await executeMongoQuery(results);
        return res.status(200).json(results);
    }catch(e){
        return res.status(500).json({error:"Error processing Query"});
    }
    
}

export {getData, postQuery};