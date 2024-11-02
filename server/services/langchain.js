import dotenv from 'dotenv';
import express from "express";
dotenv.config(); // Explicit path if needed

import OpenAI from 'openai';
import { MongoClient } from 'mongodb';
import { parse } from 'path';

const openAIClient = new OpenAI({
    apiKey: "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"
})

const messagesInput = [
    {
        role: "system", 
        content: "You are a helpful language parsing assistant. Use the supplied tools to assist the user. In your mongodb database, you have the collections, ehr_collections, hris_collections, mitel_collections, and quickbooks_collections. The ehr relates to patients, Mitel phone numbers and calls."
    },
];

const generateMongoQuery = async(naturalQuery) => {
    content = naturalQuery
    messagesInput.push({role: "user", content});

    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: messagesInput,
        tool_choice: "required", // Must always return function
        tools: tools,
    })

    const dbQuery = response.choices[0].message
    console.log(dbQuery)
    return dbQuery
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
