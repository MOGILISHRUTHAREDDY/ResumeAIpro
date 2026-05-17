const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  personalDetails: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    title: { type: String, default: '' },
    summary: { type: String, default: '' }
  },
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [{ type: String }],
  projects: [{
    title: String,
    link: String,
    description: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
