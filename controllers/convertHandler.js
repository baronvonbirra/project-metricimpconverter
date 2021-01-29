function ConvertHandler() {

    const switcher = {
      'l': 'gal',
      'km': 'mi',
      'kg': 'lbs',
      'gal': 'l',
      'mi': 'km',
      'lbs': 'kg',
    };

    const spellSwitcher = {
      'l': 'liter',
      'km': 'kilometer',
      'kg': 'kilogram',
      'gal': 'gallon',
      'mi': 'mile',
      'lbs': 'pound',
    };

  this.getReturnUnit = function (initUnit) {
    return switcher[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return spellSwitcher[unit];
  };

  this.getNum = function (input) {
    let num = input.match(/[\d\/.]+/) || ['1'];
    const result = checkNumber(num);
    return result;
  };

  const checkNumber = function (num) {
    num = num.toString();

    if (num.includes('/')) {
      const numSplit = num.split('/');
      if (numSplit.length > 2) {
        return 'invalid number';
      } else {
        num = numSplit[0] / numSplit[1];
      };
    };

    const toNum = Number(num);
    if (isNaN(toNum)) {
      return 'invalid number';
    } else {
      return toNum;
    };
  };
  
  this.unitSpeller = function (unit) {
    const units = Object.keys(spellSwitcher);
    const spelledUnits = Object.values(spellSwitcher);

    for (var i = 0; i < spelledUnits.length; i++) {
      const regex = new RegExp(`${spelledUnits[i]}`, 'i');
      if (unit.match(regex)) {
        return units[i];
      };
    };
    return 'invalid unit';
  };

  this.getUnit = function (input) {
    unitMatcher = /^gal$|^lbs$|^mi$|^l$|^kg$|^km$/i;
    input = input.toLowerCase().replace(/[0-9]|\/|\.|\s/g, '');
    const isChar = input.match(/[A-Za-z]+/g);
    let unit = input.match(unitMatcher);
    let spellChecker = this.unitSpeller(input).match(unitMatcher);

    if (input.length < 1 || !isChar || (!unit && !spellChecker)) {
      return 'invalid unit';
    } else if (!unit) {
      return spellChecker;
    } else {
      return unit.input;
    };
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const switcher = {
      'l': initNum / galToL,
      'km': initNum / miToKm,
      'kg': initNum / lbsToKg,
      'gal': initNum * galToL,
      'mi': initNum * miToKm,
      'lbs': initNum * lbsToKg
    };
    return Math.round(parseFloat(switcher[initUnit]) * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitFull = this.spellOutUnit(initUnit)
    initUnitFull += initNum != '1' ? 's' : '';
    let returnUnitFull = this.spellOutUnit(returnUnit)
    returnUnitFull += returnNum != '1' ? 's' : '';

    let parsedInitNum = Math.round(parseFloat(initNum) * 100000) / 100000;
    let parsedReturnNum = Math.round(parseFloat(returnNum) * 100000) / 100000;

    return `${parsedInitNum} ${initUnitFull} converts to ${parsedReturnNum} ${returnUnitFull}`;
  };
};

module.exports = ConvertHandler;
