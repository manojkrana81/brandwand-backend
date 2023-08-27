const Query = require('../models/query');

const addQuery = async (req, res)=>{
    try {
        const query = new Query(req.body);
        const savedQuery = await query.save();
        return res.status(200).json({
            status: 'ok',
            message: 'Query Submitted Successfully',
            data: savedQuery
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: ''
        });
    }
}

module.exports = {
    addQuery,
}