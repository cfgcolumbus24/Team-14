import express from express;

const getData = async (req, res) => {
    const {type} = req.body;
    if (type === 'EHR') {
        //res.send('EHR data');
    } else if (type === 'Mytel') {
        //res.send('Phone data');
    } else if (type === 'quickBooks') {
        //res.send('Phone data');
    } else if (type === '')
    res.send('Data route');
}

const getQuery = async (req, res) => {
    const {type, info} = req.body;
    res.send('Data route');
}