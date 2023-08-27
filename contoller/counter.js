const Counter = require("../models/counter")

const createCounter = async (req, res)=>{
    try{
        const newCounter = new Counter({
            counterType: req.params.counterType,
            count: 1
        });
        await newCounter.save();
        return res.status(200).json({
            status: 'ok',
            message: `${req.params.counterType} counter created successfully`,
            data: ''
        });

    }
    catch(err){
        return res.status(400).json({
            status: 'error',
            message: err.message,
            data:''
        })
    }
}

module.exports = {
    createCounter
}