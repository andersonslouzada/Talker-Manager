const express = require('express');
const { validateId } = require('./middlewares/validateId');
const { loginAuth, tokenAuth, bodyAuth } = require('./middlewares/validateData');
const filters = require('./middlewares/filters');
const { generateToken } = require('./utils/randonToken');
const { readTalker, writeTalker } = require('./utils/fsUtils');
const generateNewID = require('./utils/newID');
const validateRate = require('./utils/validateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenAuth, filters, async (req, res) => {
    res.status(200).json(req.data);
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
  const talkers = await readTalker();
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const index = talkers.findIndex((element) => element.id === parseInt(id, 10));
  const updatedTalker = { id: Number(id), name, age, talk };
  talkers[index] = updatedTalker;

  await writeTalker(talkers);
  res.status(200).json(updatedTalker);
});

app.delete('/talker/:id', validateId, async (req, res) => {
  const talkers = await readTalker();
  const { id } = req.params;
  
  const index = talkers.findIndex((element) => element.id === parseInt(id, 10));
  console.log(index);
  if (index !== -1) {
    talkers.splice(index, 1);
    await writeTalker(talkers);
  }
  res.status(204).send();
});

app.patch('/talker/rate/:id', validateId, async (req, res) => {
  const { talker } = req;
  const { rate } = req.body;

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); 
  }
  if (!validateRate(Number(rate))) {
    console.log('ok no if do validate');
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  talker.talk.rate = rate;
  await writeTalker([talker]);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
