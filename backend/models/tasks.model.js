const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const taskSchema = new Schema({
    text: { require: true, type: String },
    day: { require: true, type: String },
    desc: { require: true, type: String },
    reminder: { require: true, type: Boolean }
});

const Task = mongooes.model('Task', taskSchema);
module.exports = Task;