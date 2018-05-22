var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Pumpkin = function Pumpkin(pie) {
    classCallCheck(this, Pumpkin);

    console.log('You ate ' + pie + ' pie.');
};

var pumpkin = new Pumpkin('banna cream');
