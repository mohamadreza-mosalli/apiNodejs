module.exports = {

    proccess : async (req , res , next) => {
        res.json(req.value.body);
    }

};