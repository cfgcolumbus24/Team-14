import express from "express"
import testEHR from '../../testdata/test_ehr.json' with { type: 'json' };

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

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}

export {getData, getQuery};