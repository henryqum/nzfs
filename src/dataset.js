const { execSync } = require("child_process");

async function getData(name) {
  var str = execSync(`zfs get all -H -o property,value ${name}`).toString().split("\n");
  str.pop();
  var result = {};
  str.map((line) => {
    let tmp = line.split("\t");
    result[tmp[0]] = tmp[1];
  });
  return result;
}

module.exports.getData = getData;