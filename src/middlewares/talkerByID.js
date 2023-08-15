const { readTalkers } = require('../utils/fsUtils');

async function talkerByID(req, res, next) {
  const talkers = await readTalkers();
  const talker = talkers.find((element) => element.id === Number(req.params.id));
  if (talker) {
    req.talker = talker;
    next();
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
}

module.exports = {
  talkerByID,
};