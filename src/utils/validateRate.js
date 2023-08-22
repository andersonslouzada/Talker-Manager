const validateRate = (rate) => (Number(rate) >= 1 && Number(rate) <= 5 && Number.isInteger(rate));

module.exports = validateRate;