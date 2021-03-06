const { execSync } = require("child_process");
const { stderr } = require("process");

/**
 * 
 * @param {String} dataset
 * @param {Array} properties 
 */
async function get(dataset, properties=[]) {
  if (properties.length == 0) {
    properties.push("all")
  }

  var result = {}

  try {
    lines = execSync(`zfs get -H -o property,value ${properties} ${dataset}`, {stdio: ['pipe','null']}).toString().split('\n')
  } catch (error) {
    throw new Error(`could not get properties "${properties}" of dataset "${dataset}"`)
  }

  lines.pop() // drop new line at end of result

  // parse columns
  lines.forEach((line) => {
    let pair = line.split('\t')
    result[pair[0]] = pair[1]
  })

  return result
}

/**
 * 
 * @param {String} type 
 */
async function list(dataset="", type="filesystem") {
  var ret = execSync(`zfs list -H -o name -t ${type} ${dataset}`, {stdio: ['pipe','null']}).toString().split('\n')
  ret.pop() // drop new line
  return ret
}

module.exports.get = get
module.exports.list = list
