import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const uri = "mongodb+srv://Victor:user1@reportingdata.t1ydb.mongodb.net/?retryWrites=true&w=majority&appName=ReportingData"
const dbName = 'ReportingData';
const collectionName = "products";



async function checkDatabaseConnection() {
    const client = new MongoClient(uri);
  
    try {
      // Connect to the MongoDB database
      await client.connect();
      console.log('Connected to MongoDB');
  
      // Get a reference to the database and a test collection
      const db = client.db(dbName);
      const collection = db.collection('test_collection');
  
      // Insert a temporary test document
      const testDoc = { test: 'ping', timestamp: new Date() };
      const result = await collection.insertOne(testDoc);
  
      if (result.insertedCount === 1) {
        console.log('Test document inserted successfully');
      }
  
      // Remove the test document
      await collection.deleteOne({ _id: result.insertedId });
      console.log('Test document deleted successfully');
  
      console.log('Database connection and operations are functional');
    } catch (error) {
      console.error('Error connecting to MongoDB or performing operations:', error);
    } finally {
      // Close the connection
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
  
  // Call the method to check the database connection
  checkDatabaseConnection();
  
