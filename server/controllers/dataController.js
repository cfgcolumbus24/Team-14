import express from "express"
import testEHR from '../../testdata/test_ehr.json' with { type: 'json' };
//mongo db stuff
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


//mongo db variables
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

        /* determine collection */

        let collectionName = type + "_collection";
        const collection = await db.listCollections({name: collectionName}).toArray();

        if (collection.length === 0) {
            res.status(500).send('Collection not found').json({error: "Collection not found"});
        }

        const data = await db.collection(collectionName).find({}).toArray();

        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error occurred');
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}

export {getData, getQuery};