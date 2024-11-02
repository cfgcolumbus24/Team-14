import express from "express"
import testEHR from '../../testdata/test_ehr.json' assert { type: 'json' };

const getData = async (req, res) => {
    try {
        const type = req.query.type;
        if (type === 'EHR') {
            res.send(testEHR);
        } else if (type === 'Mytel') {
            res.send('not implemented yet');
        } else if (type === 'quickBooks') {
            res.send('not implemented yet');
        }
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
    }
}

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}

export {getData, getQuery};