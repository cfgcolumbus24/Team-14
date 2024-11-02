import express from "express"
import testEHR from '../../testdata/test_ehr.json' with { type: 'json' };
//mongo db stuff
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


//mongo db variables here
const uri = "mongodb+srv://Victor:user1@reportingdata.t1ydb.mongodb.net/?retryWrites=true&w=majority&appName=ReportingData"
const dbName = 'ReportingData';
const collectionName = "products";

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
        
        if (!collectionExists) {
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

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}

export {getData, getQuery};