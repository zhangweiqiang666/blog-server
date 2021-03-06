const { resTemp, errTemp, dataTemp } = require('../config');
const { TagModel } = require('../../db');
module.exports = (req, res) => {
  const { tagId, ...value } = req.body;
  if (!value.color) {
    const color = [
      'magenta',
      'red',
      'volcano',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'geekblue',
      'purple'
    ];
    const index = Math.round(Math.random() * 10);
    value.color = color[index];
  }
  if (!!tagId) {
    TagModel.findByIdAndUpdate(tagId, value, (err, tag) => {
      if (!!err) return res.json(errTemp(err, '数据库错误，保存失败'));
      (!!tag && res.json(resTemp({ tag }))) ||
        res.json(errTemp(err, '保存失败，此数据不存在'));
    });
  } else {
    //tagId未传 则创建
    TagModel.create(value, (err, tag) => {
      if (!!err)
        return res.json(
          errTemp(
            err,
            err.code === 11000 ? '该标签已存在' : '数据库错误，保存失败'
          )
        );
      res.json(resTemp({ tag: dataTemp(tag) }));
    });
  }
};
