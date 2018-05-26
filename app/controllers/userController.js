module.exports = {

    profile : async (req , res , next) => {
        res.json({
            user : req.user,
            status : 200
        })
    }

};