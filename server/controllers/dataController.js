import express from express;

const testEHR = require('../data/testData.json');

const getData = async (req, res) => {
    try {
        const {type} = req.body;
        if (type === 'EHR') {
            res.send(testEHR);
        } else if (type === 'Mytel') {
            //res.send('Phone data');
        } else if (type === 'quickBooks') {
            //res.send('Phone data');
        } else if (type === '')
        res.send('Data route');
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
    }
}

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}