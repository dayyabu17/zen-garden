const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoordSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  color: { type: String }
}, { _id: false });

const ArtSchema = new Schema({
  name: { type: String, required: true },
  data: { type: [CoordSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Art', ArtSchema);
