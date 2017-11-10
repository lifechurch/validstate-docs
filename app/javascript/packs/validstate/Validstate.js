class Validstate {

  /*
  * @function thetypeof
  * @description returns the type of supplied parameter. e.g(thetypeof(obj).is('object'))
  * @param value
  * @returns boolean
  */
  thetypeof(name) {
    let obj = {};
    obj.object = 'object Object'
    obj.array = 'object Array'
    obj.string = 'object String'
    obj.boolean = 'object Boolean'
    obj.number = 'object Number'
    obj.type = Object.prototype.toString.call(name).slice(1, -1)
    obj.name = Object.prototype.toString.call(name).slice(8, -1)
    obj.is = (ofType) => {
        ofType = ofType.toLowerCase();
        return (obj.type === obj[ofType])? true: false
    }
    obj.isnt = (ofType) => {
        ofType = ofType.toLowerCase();
        return (obj.type !== obj[ofType])? true: false
    }
    obj.error = (ofType) => {
        throw new TypeError(`The type of ${name} is ${obj.name}: `
        +`it should be of type ${ofType}`)
    }
    return obj;
  };

  /*
  * @function getLength
  * @description  returns length of supplied value
  * @param value
  * @returns length
  */
  getLength(value) {
    if(this.thetypeof(value).is('object')) {
      return Object.keys(value).length;
    } else {
      return value.length;
    }
  }

  /*
  * Checks if value is empty. Deep-checks arrays and objects
  * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
  * @param value
  * @returns {boolean}
  */
  isEmpty(value){
    var isEmptyObject = function(a) {
      if (typeof a.length === 'undefined') { // it's an Object, not an Array
        var hasNonempty = Object.keys(a).some(function nonEmpty(element){
          return !isEmpty(a[element]);
        });
        return hasNonempty ? false : isEmptyObject(Object.keys(a));
      }

      return !a.some(function nonEmpty(element) { // check if array is really not empty as JS thinks
        return !isEmpty(element); // at least one element should be non-empty
      });
    };
    return (
      value == false
      || typeof value === 'undefined'
      || value == null
      || (typeof value === 'object' && isEmptyObject(value))
    );
  }

  /*
  * @function required
  * @description  Determine if a value is required
  * @parameter value
  * @return Boolean
  */
  isPresent(value) {
    return !this.isEmpty(value)
  }

  /*
  * @function required
  * @description  Determine if a value is required
  * @parameter value
  * @return Boolean
  */
  required(value) {
    return this.isPresent(value)
  }

  /*
  * @function minLength
  * @description  Determine if a value's length is >= supplied length
  * @parameter value, length
  * @return Boolean
  */
  minLength(value, length) {
    return this.getLength(value) >= length ? true : false;
  }

  /*
  * @function maxLength
  * @description  Determine if a value's length is <= supplied length
  * @parameter value, length
  * @return Boolean
  */
  maxLength(value, length) {
    return this.getLength(value) <= length ? true : false;
  }

}

module.exports = Validstate;
