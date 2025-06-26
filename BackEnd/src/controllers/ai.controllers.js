const aiService = require('../services/ai.services');
module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if(!code){
        return res.status(400).send({error: 'Code is required'});
    }

    const responce = await aiService(code);

    res.send(responce);
}

