//capitalize first letter of string
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//get all the relevant fields from a model
const pickSchema = (model, excluded) => {
  var fields = []

  model.schema.eachPath(function (path) {
    const splitpath = path.split(".")[0]
    Array.isArray(excluded) ? excluded.indexOf(splitpath) < 0 ? fields.push(splitpath) : false : splitpath === excluded ? false : fields.push(splitpath);
  })

  return fields;
 }

  export {
    capitalize,
    pickSchema
  }