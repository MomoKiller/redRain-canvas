; (function () {
  var Body = function () {
    var self = this;
    this.moneyList = [];
    this.mainpen = new pen();
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchend', touch, false);
    function touch(event) {//点击 
      var event = event || window.event;
      switch (event.type) {
        case "touchstart":
          self.mainpen.x = event.touches[0].clientX;
          self.mainpen.y = event.touches[0].clientY;
          break;
        case "touchend":
          self.mainpen.x = 0;
          self.mainpen.y = 0;
          break;
      }
    }
    var addInterval = setInterval(function () {
      if (!_redPack.isEnd) {
        // self.addMoney(Math.random() * _redPack.canvasWidth - 90);
        _redPack.dropLeft = Math.ceil(Math.random() * 3);
        switch (_redPack.dropLeft) {
          case 0:
            self.addMoney(Math.random() * 40 + _redPack.canvasWidth / 8);
            break;
          case 1:
            self.addMoney(Math.random() * 40 + _redPack.canvasWidth / 8);
            break;
          case 2:
            self.addMoney(Math.random() * 40 + _redPack.canvasWidth / 8 * 5);
            break;
          case 3:
            self.addMoney(Math.random() * (_redPack.canvasWidth - 90));
            break;
          default:
            self.addMoney(Math.random() * 40 + _redPack.canvasWidth / 8 * 5);
            break;
        }
      } else {
        clearInterval(addInterval);
        _redPack.body.clear();      // 动画结束--画布清理
      }
    }, 250);  // 控制添加红包的密度
  }
  Body.prototype.clear = function () {//清屏  
    _redPack.context.clearRect(0, 0, _redPack.canvasWidth, _redPack.canvasHeight);
  }
  Body.prototype.addMoney = function (x) {//掉钱
    var random = Math.floor(Math.random() * 4);
    if (random == 0 && _redPack.five_num_left >= 0 && !_redPack.isEnd) {
      this.moneyList.push(new money(x, "five"));
    } else if (random == 1 && _redPack.ten_num_left >= 0 && !_redPack.isEnd) {
      this.moneyList.push(new money(x, "ten"));
    } else if (random == 2 && _redPack.empty_num_left >= 0 && !_redPack.isEnd) {
      this.moneyList.push(new money(x, "empty"));
    } else if (random == 3 && _redPack.empty_num_left >= 0 && !_redPack.isEnd) {
      this.moneyList.push(new money(x, "zad"));
    }
  }
  Body.prototype.draw = function () {
    this.moneyList.forEach(function (item) {
      item.drop();
    });
  }
  window.Body = Body;
})();