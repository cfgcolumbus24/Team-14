import dotenv from 'dotenv';
import express from "express";
dotenv.config(); // Explicit path if needed

import { ChatOpenAI } from "@langchain/openai";
import { MongoClient } from 'mongodb';

console.log('Loaded API Key:', process.env["OPENAI_API_KEY"]); // Debugging log
const chatModel = new ChatOpenAI({
    apiKey: "OPENAI_API_KEY",
});

const generateMongoQuery = async(naturalQuery) => {
    const llmResponse = await chatModel.call(`Generate a MongoDB find query for this request: "${naturalQuery}"`);
    console.log('Generated MongoDB Query:', llmResponse);

    try {
        const parsedQuery = JSON.parse(llmResponse);
        return parsedQuery;
    } catch (error) {
        console.error('Error parsing the generated MongoDB query:', error);
        throw new Error('Invalid query format generated.');
    }
}

const executeMongoQuery = async(dbName, collectionName, query) => {
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log("Connected to Database");
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = await collection.find(query).toArray();
        return results;

    }catch(e){
        console.error("Error executing MongoDB");
    }finally {
        await client.close()
        console.log("Connection closed");
    }
}

export {generateMongoQuery, executeMongoQuery}
