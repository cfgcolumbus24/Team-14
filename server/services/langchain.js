import dotenv from 'dotenv';
import express from "express";
dotenv.config(); // Explicit path if needed

import OpenAI from 'openai';
import { MongoClient } from 'mongodb';
import { parse } from 'path';
import { json } from 'stream/consumers';

const openAIClient = new OpenAI({
    apiKey: "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"
})

const tools = [
    {
        type: "function",
        function: {
            name: "createQueryObject",
            description: "Given the user's input create a query object with the collectionName, and the query to be made within the collection",
            parameters: {
                type: "object",
                properties: {
                    collectionName:{
                        type:"string",
                        description:"The name of the collection the query will be executed on"
                    },
                    query:{
                        type:"string",
                        description: "The query to be executed."
                    }
                },
                required: ["collectionName", "query"]
            }
        }
    }
    
];

const messagesInput = [
    {
        role: "system", 
        content: "You are a helpful language parsing assistant. Use the supplied tools to assist the user. In your mongodb database, you have the collections, ehr_collections, hris_collections, mitel_collections, and quickbooks_collections. The ehr relates to patients, Mitel phone numbers and calls. In your response only provide the database query."
        
    },
    {
        role: "system",
        content: "The sample ehr_collections object has the items StartVisitDate and  EndVisitDate, ."
    }
];

const generateMongoQuery = async(naturalQuery) => {
    const openAIClient = new OpenAI({
        apiKey: "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"
    })
    
    const content = naturalQuery
    console.log(content)
    messagesInput.push({role: "user", content});
    console.log(messagesInput)
    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: messagesInput,
        tool_choice: "required",
        tools: tools
    })
    
    const jsonOutput = response.choices[0].message.tool_calls?.[0].function.arguments
    const ret = JSON.parse(jsonOutput)
    return ret
}

const executeMongoQuery = async(collectionName, query) => {
    console.log("0")
    const openAIClient = new OpenAI({
        apiKey: "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"
    })
    const uri = "mongodb+srv://Victor:user1@reportingdata.t1ydb.mongodb.net/?retryWrites=true&w=majority&appName=ReportingData"
    const client = new MongoClient(uri);
    try{
        console.log("1")
        await client.connect();
        console.log("2")
        console.log("Connected to Database");
        
        const db = client.db('ReportingData');
        console.log(collectionName)
        const collection = db.collection(collectionName);
        console.log("Query before parsing:", query);
        
        console.log(typeof(query))
        console.log(newQuery)
        const results = await collection.find(newQuery).toArray();
        return results;

    }catch(e){
        console.error("Error executing MongoDB");
    }finally {
        await client.close()
        console.log("Connection closed");
    }
}

export {generateMongoQuery, executeMongoQuery}
