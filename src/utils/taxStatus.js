const taxStatusList = [
  { desc: "Taxable", abbreviation: "T" },
  { desc: "Exempt", abbreviation: "E" },
  { desc: "Resale", abbreviation: "R" },
  { desc: "Cap Improvement", abbreviation: "I" },
];
const taxStatus = (abbr) => {
  const status = taxStatusList.find((item) => {
    return item.abbreviation === abbr;
  });
  return status.desc;
};

module.exports = taxStatus;
