const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  title: String,
  body: String,
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = {Issue};
