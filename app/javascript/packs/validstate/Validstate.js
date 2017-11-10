import * as ValidstateConst from './ValidstateConst';

export default class Validstate {

  /*
  * @function constructor
  * @description Initilize component variables
  * @param 
  * @returns Validstate instance
  */
  constructor(){
    this.store = null;
    this.rules = {};
    this.properties = {};
  }

  /*
  * @function init
  * @description Initilize object with application rules
  * @param rules, store
  * @returns Validstate instance
  */
  init(rules, store){
    this.rules = rules;
    this.store = store;

    //Parse rules for properties and normalize
    this.properties = {}; 

    this.store.dispatch({
      type: ValidstateConst.VALIDSTATE_INIT,
      payload: this.properties
    })
  }

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
      || Object.is(value, NaN)
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

  /*
  * @function rangeLength
  * @description Check value is between a given range of lengths. 
  * @parameter value, range(hyphenated string)
  * @return Boolean
  */
  rangeLength(value, range) {
    if(this.thetypeof(value).is('array') || this.thetypeof(value).is('string')) {
      const rangeValue = range.split("-")
      return this.minLength(value, rangeValue[0]) && this.maxLength(value, rangeValue[1]);
    } else { return false };
  }

  /*
  * @function min
  * @description  Determine if a value is >= min parameter
  * @parameter value, min
  * @return Boolean
  */
  min(value, min) {
    return value >= min ? true : false;
  }

  /*
  * @function max
  * @description  @description  Determine if a value is <= min parameter
  * @parameter value, max
  * @return Boolean
  */
  max(value, max) {
    return value <= max ? true : false;
  }

  /*
  * @function range
  * @description Check value is between a given range. 
  * @parameter value, range(hyphenated string)
  * @return Boolean
  */
  range(value, range) {
    const rangeValue = range.split("-")
    return this.min(value, rangeValue[0]) && this.max(value, rangeValue[1]);
  }

  /*
  * @function step
  * @description Check value in given step. 
  * @parameter value, step
  * @return Boolean
  */
  step(value, step) {
    return (value % step !== 0) ? false : true
  }

  /*
  * @function email
  * @description Check value is valid email. 
  * @parameter email
  * @return Boolean
  */
  email(email) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  }

  /*
  * @function number
  * @description  Makes the element require a number. 
  * @parameter value
  * @return Boolean
  */
  number(value) {
    return this.thetypeof(value).is('number') ? true : false;
  }

  /*
  * @function numeric
  * @description Makes the element require a numberical value. 
  * @parameter value
  * @return Boolean
  */
  numeric(value) {
    if(this.thetypeof(value).is('number') || this.thetypeof(value).is('string')) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    } else { return false };
  }

  /*
  * @function integer
  * @description Checks for the value to be positive or negative non decimal. 
  * @parameter value
  * @return Boolean
  */
  integer(value) {
    if(this.thetypeof(value).is('number') || this.thetypeof(value).is('string')) {
      return Number.isInteger(value)
    }
  }

  /*
  * @function digits
  * @description Checks for the value to be positive non decimal numeral. 
  * @parameter value
  * @return Boolean
  */
  digits(value) {
    return /^\d+$/.test( value );
  }

  /*
  * @function equalTo
  * @description Soft compare of one value to another ==
  * @parameter value, comparison
  * @return Boolean
  */
  equalTo(value, comparison) {
    return value == comparison;
  }

  /*
  * @function isEqualTo
  * @description Strong comparison of one value to another ===
  * @parameter value, comparison
  * @return Boolean
  */
  isEqualTo(value, comparison) {
    return value === comparison;
  }

}
