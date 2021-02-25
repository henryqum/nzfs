const { execSync } = require("child_process");
const dataset = require("./dataset");

async function getDatasets() {
  const dss = execSync("zfs list -H -o name").toString().split("\n");
  dss.pop();
  
  var dssInfo = [];
  dss.map((ds) => {
    dssInfo.push(dataset.getData(ds));
  });

  dssInfo = await Promise.all(dssInfo);

  return dssInfo;
}

module.exports.getDatasets = getDatasets;
