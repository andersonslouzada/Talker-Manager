const { readTalker } = require('../utils/fsUtils');

async function talkerByID(req, res, next) {
  const talkers = await readTalker();
  const talker = talkers.find((element) => element.id === Number(req.params.id));
  if (talker) {
    req.talker = talker;
    next();
  } else {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
}

module.exports = {
  talkerByID,
};
