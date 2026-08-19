const AppError = require("./AppError");
const appError = require("./AppError")
const validateProjectQuery = (req, res, next)=>{
    const {page, limit, status} = req.query;
    if(page!=undefined){
        const pageNumber = Number(page);
        if(!Number.isInteger(pageNumber) || pageNumber< 1){
            throw new AppError(
                "Page must be a postive integer", 400
            )
        }
    };
    if(limit !== undefined){
        const limitNumber = Number(limit);
        if(
            !Number.isInteger(limitNumber) ||
            limitNumber < 1 ||
            limitNumber > 100
        ){
            throw new AppError(
                "Limit must be between 1 to 100", 400
            )
        }
    }
    if(status !== undefined && status !== "completed"){
        throw new AppError("Status must be active or completed", 400);
    }
    next();
}

module.exports = validateProjectQuery;