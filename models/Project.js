const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  publicDescription: {
    type: String,
    default: '',
  },
  privateDescription: {
    type: String,
    default: '',
  },
  interests: {
    type: Array,
    default: [],
  },
  skills: {
    type: Array,
    default: [],
  },
  private: {
    type: Boolean,
    default: true,
  },
  members: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'accounts',
  }
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
