import util from "util"
import ServiceLocator from "./ServiceLocator";

var linq = require('linq');
var utils = {};
utils.from = linq.from;
utils.isArray = a => Array.isArray(a);

utils.indexOfEx = (a, exp) => {
    var result = -1;
    if (utils.isArray(a)) {
        for(var i=0;i<a.length;i++){
            if (exp && exp(a[i]))
                return i;
        }
    }
    return -1;
};
utils.clean = function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    
    return obj
}



export default utils;