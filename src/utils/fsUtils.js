const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '.././talker.json';

async function readTalkers() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
    const talkers = JSON.parse(data);

    return talkers;
  } catch (error) {
    console.error(`Erro de leitura: ${error}`);
  }
}

async function writeTalkers(newTalker) {
  try {
    const oldTalkers = await readTalkers();
    const newTalkers = JSON.stringify([...oldTalkers, newTalker]);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), newTalkers);
  } catch (error) {
    console.error(`Erro de leitura: ${error}`);
  }
}

module.exports = {
  readTalkers,
  writeTalkers,
};