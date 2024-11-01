import express from express;

const getData = (req, res) => {
    const {type} = req.body;
    if (type === 'EHR') {
        //res.send('EHR data');
    } else if (type === 'Phone') {
        //res.send('Phone data');
    } else if (type === 'Financial') {
        //res.send('Phone data');
    }
    res.send('Data route');
}

const getQuery = (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}