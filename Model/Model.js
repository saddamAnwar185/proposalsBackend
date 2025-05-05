const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('connected')})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This references the 'User' model
        required: true,
    }
})

const Users = mongoose.model("User", userSchema);
const Projects = mongoose.model('Projects', projectSchema)

module.exports = {
    Users,
    Projects
};
