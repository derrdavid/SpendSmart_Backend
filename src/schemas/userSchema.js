import mongoose from "mongoose";
const { Schema } = mongoose;
const { randomUUID } = require('crypto');

const userSchema = new Schema({
    id: { type: 'UUID', default: () => randomUUID() },
    name: String,
});