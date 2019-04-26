const mongoose = require('mongoose');
const Project = require('./Project');
const { Schema } = mongoose.Schema;

const ProfileSchema = new Schema({
    profile: {
        firstName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: false,
        },
        interests: [{
          type: String,
          required: false,
        }],
        skills: [{
          type: String,
          required: false,
        }],
        education: [{
          instituteName: {
            type: String,
            required: false,
          },
          degree: {
            type: String, 
            required: false,
          },
          fieldOfStudy: {
            type: String,
            required: false,
          },
          fromDate: {
            type: Date,
            required: false,
          },
          endDate: {
            type: Date,
            required: false,
          },
          description: {
            type: String,
            required: false,
          },
        }],
        pastExperience: [{
          company: {
            type: String,
            required: false,
          },
          title: {
            type: String,
            required: false,
          },
          location: {
            type: String,
            required: false,
          },
          fromDate: {
            type: Date,
            required: false,
          },
          endDate: {
            type: Date,
            required: false,
          },
          description: {
            type: String,
            required: false,
          },
        }],
        projects: [Project],
        github: {
          type: String,
          required: false,
        },
        facebook: {
          type: String,
          required: false,
        },
        linkedin: {
          type: String,
          required: false,
        },
        twitter: {
          type: String,
          required: false,
        },
        instagram: {
          type: String,
          required: false,
        },
      }
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;