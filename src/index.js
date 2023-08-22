const express = require('express');
const { readTalker, writeTalker } = require('./utils/fsUtils');
const { validateId } = require('./middlewares/validateId');
const { generateToken } = require('./utils/randonToken');
const { loginAuth, tokenAuth, bodyAuth } = require('./middlewares/validateData');
const generateNewID = require('./utils/newID');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalker();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', validateId, async (req, res) => {
  const { talker } = req;
  res.status(200).json(talker);
});

app.post('/login', loginAuth, async (req, res) => {
  const token = { token: generateToken() };
  res.status(200).json(token);
});

app.use(tokenAuth);

app.post('/talker', bodyAuth, async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await readTalker();

  const newID = generateNewID(talkers);
  const talker = { id: newID, name, age, talk };
  talkers.push(talker);

  await writeTalker(talkers);
  res.status(201).json(talker);
});

app.put('/talker/:id', validateId, bodyAuth, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await readTalker();

  const index = talkers.findIndex((element) => element.id === parseInt(id, 10));
  const updatedTalker = { id: Number(id), name, age, talk };
  talkers[index] = updatedTalker;

  await writeTalker(talkers);
  res.status(200).json(updatedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
