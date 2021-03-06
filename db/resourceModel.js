const { Schema, model } = require('mongoose');

//定义描述文档结构
const resourceSchema = Schema({
  // name: { type: String, required: true, unique: true },
  originalname: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, required: true },
  isTrash: { type: Boolean, /* required: true, */ defalut: false },
  ext: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  destination: { type: String, required: true },
  size: { type: String, required: true },
  filename: { type: String, required: true },
  editTime: { type: Date, required: true },
});
//定义Model
module.exports = model('resource', resourceSchema);
