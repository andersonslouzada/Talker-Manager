const express = require('express');
const { readTalkers } = require('./utils/fsUtils');
const { talkerByID } = require('./middlewares/talkerByID');
const { generateToken } = require('./utils/randonToken');

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

app.post('/login', async (req, res) => {
  const token = { token: generateToken() };
  res.status(200).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
