const express = require('express');
const { readTalkers } = require('./utils/fsUtils');
const { talkerByID } = require('./middlewares/talkerByID');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();

  return res.status(200).json(talkers);
});

app.get('/talker/:id', talkerByID, async (req, res) => {
  const { talker } = req;
  res.status(200).json(talker);
});

app.use((_error, _req, res, _next) => 
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' }));

app.listen(PORT, () => {
  console.log('Online');
});
