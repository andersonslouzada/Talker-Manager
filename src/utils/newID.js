const generateNewID = (talkers) => {
  const maxID = talkers.reduce((max, talker) => Math.max(max, talker.id), 0);
  return maxID + 1;
};

module.exports = generateNewID;