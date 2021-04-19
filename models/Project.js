const mongoose = require('mongoose');

const Project = new mongoose.Schema({
    projectName: {type: String, default: ''},
    projectDescription: {type: String, default: ''},
    projectThumbnailPath: {type: String, default: 'https://via.placeholder.com/150'},
    projectGithubLink: {type: String, default: 'https://github.com/Holliewood67'}
});

module.exports = mongoose.model('Project', Project);