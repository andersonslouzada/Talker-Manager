const { readTalkers } = require('../utils/fsUtils');

async function talkerByID(req, res, next) {
  const talkers = await readTalkers();
  const talker = talkers.find((element) => element.id === Number(req.params.id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  req.talker = talker;
  next();
  }

module.exports = {
  talkerByID,
};