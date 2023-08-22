const { readTalker } = require('../utils/fsUtils');
const validateRate = require('../utils/validateRate');

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

async function filterName(req, res, next) {
  const talkers = await readTalker();
  const { q } = req.query;
  let data = talkers;
  if (q) {
    data = talkers.filter((talker) => talker.name.toLowerCase()
    .includes(q.toLowerCase())); 
  }
  req.data = data;
  next();
}

function filterRate(req, res, next) {
  let { data } = req;
  const { rate } = req.query;
  if (rate) {
    const rateNumber = Number(rate);
    if (!validateRate(rateNumber)) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' }); 
    } 
    data = data.filter((talker) => talker.talk.rate === Number(rate)); 
  }
  req.data = data;
  next();
}

function filterDate(req, res, next) {
  let { data } = req;
  const { date } = req.query;
  if (date) {
    if (!dateRegex.test(date)) {
      return res.status(400)
       .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' }); 
     }
     data = data.filter((talker) => talker.talk.watchedAt === date); 
  }
  req.data = data;
  next();
}

const filters = [filterName, filterRate, filterDate];

module.exports = filters;