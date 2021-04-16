//capitalize first letter of string
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//get all the relevant fields from a model
export const pickSchema = (model, excluded) => {
  var fields = []

  model.schema.eachPath(function (path) {
    const splitpath = path.split(".")[0]
    Array.isArray(excluded) ? excluded.indexOf(splitpath) < 0 ? fields.push(splitpath) : false : splitpath === excluded ? false : fields.push(splitpath);
  })

  return fields;
 }

 //serialize object into URI string
  export const serialize = ( obj ) => {
    let str = '?' + Object.keys(obj).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
    return str;
}