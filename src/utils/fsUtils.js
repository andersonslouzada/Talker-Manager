const fs = require('fs').promises;
// const path = require('path');

const TALKER_DATA_PATH = 'src/talker.json';

async function readTalker() {
  try {
    const data = await fs.readFile(TALKER_DATA_PATH);
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro de leitura: ${error}`);
  }
}

async function writeTalker(data) {
  try {
    await fs.writeFile(TALKER_DATA_PATH, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro de escrita: ${error}`);
  }
}

module.exports = {
  readTalker,
  writeTalker,
};
