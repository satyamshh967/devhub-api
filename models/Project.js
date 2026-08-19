const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        enum: ["active", "completed"]
    }
}, {timestamps:true} )

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;