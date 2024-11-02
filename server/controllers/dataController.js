import express from "express"
import testEHR from '../../testdata/test_ehr.json' with { type: 'json' };
import { executeMongoQuery, generateMongoQuery } from "../services/langchain.js";
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Victor:user1@reportingdata.t1ydb.mongodb.net/?retryWrites=true&w=majority&appName=ReportingData"
const dbName = 'ReportingData';

const getData = async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB database');
        
        const db = client.db(dbName);
        const type = req.query.type;

        // Determine collection name
        const collectionName = `${type}_collection`;
        
        // Check if the collection exists
        const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
        
        if (!collectionExists) {const uri = "mongodb+srv://Victor:user1@reportingdata.t1ydb.mongodb.net/?retryWrites=true&w=majority&appName=ReportingData"
            const dbName = 'ReportingData';
            return res.status(500).json({ error: "Collection not found" });
        }

        // Retrieve data from the existing collection
        const data = await db.collection(collectionName).find({}).toArray();

        return res.status(200).json(data);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
};

const postQuery = async (req, res) => {
    try{
        const { query } = req.body;
        if (!query) {
            return res.status(500).json({error:"Query required"})
        }
        const mongoQuery = await generateMongoQuery(query);
        const results = await executeMongoQuery(mongoQuery);
        return res.status(200).json(results);
    }catch(e){
        return res.status(500).json({error:"Error processing Query"});
    }
    
}

export {getData, postQuery};