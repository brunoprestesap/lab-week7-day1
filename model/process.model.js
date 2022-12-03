import { Schema, model } from "mongoose";

const processSchema = new Schema({

    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
        lowercase: true,
    },
    details: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        lowercase: true,
    },
    dateInit: {
        type: Date,
    },
    dateEnd: {
        type: Date,
    },
    department: {
        type: String,
        lowercase: true,
    },
    comments: [{type: String}],
},
{
    timestamps: true,
});

const ProcessModel = model("Process", processSchema)

export default ProcessModel;