; (function () {
  var five = new Image();//5
  five.src = "images/f1.png";
  var ten = new Image();//100
  ten.src = "images/f2.png";
  var empty = new Image();//空的
  empty.src = "images/f3.png";
  var zad = new Image();//炸弹
  zad.src = "images/f0.png";
  //
  var pack = new Image(); // 取到图片 
  pack.src = "images/f0.png";

  var moneyEnum = {
    five: {
      image: five,
      speed: 5,
      value: 5,
      widths: 44,
      heights: 57,
    },
    ten: {
      image: five,
      speed: 5,
      value: 5,
      widths: 49,
      heights: 63,
    },
    empty: {
      image: five,
      speed: 5,
      value: 5,
      widths: 39,
      heights: 51,
    },
    zad: {
      image: five,
      speed: 5,
      value: 5,
      widths: 42,
      heights: 54,
    }
  };
  var money = function (x, type) {
    this.x = x;
    this.y = 0;
    this.type = type;
    this.status = 0;//0正在掉落，1接住 ，2没接住
    this.widths = moneyEnum[this.type].widths;
    this.heights = moneyEnum[this.type].heights;
    // 
    this.stayY = 0;
    this.tmpWidth = 0;
    this.resWidth = 0;
    this.resHeight = 0;
    this.resX = 0;
    this.resY = 0;
  }
  money.prototype.draw = function () {
    if (this.status == 0) {
      _redPack.context.drawImage(moneyEnum[this.type].image, this.x, this.y, moneyEnum[this.type].widths, moneyEnum[this.type].heights);
      // _redPack.context.drawImage(moneyEnum[this.type].image, this.x, this.y, moneyEnum[this.type].widths * (375 / _redPack.canvasWidth), moneyEnum[this.type].heights * (667 / _redPack.canvasHeight));
    }
    else if (this.status == 1) {     // 接住的红包
      if (this.tmpWidth < this.widths * 0.4) {
        this.tmpWidth++;
        this.resWidth = this.tmpWidth + this.widths;
        this.resHeight = this.heights / this.widths * this.resWidth;
        this.resX = this.x - this.tmpWidth / 2;
        this.resY = this.stayY - (this.tmpWidth * this.heights / this.widths) / 2;
        _redPack.context.drawImage(pack, this.resX, this.resY, this.resWidth * (375 / _redPack.canvasWidth), this.resHeight * (667 / _redPack.canvasHeight));
      } else if (this.resY >= 50) {
        this.resY -= 5;
        this.resX -= (this.x - 50) / (this.stayY - 50) * 5;
        if (this.resWidth > 11) {
          this.resWidth -= 1;
          this.resHeight = this.resHeight - this.heights / this.widths * 1;
        } else {
          this.resWidth = 10;
          this.resHeight = 14;
        }
        _redPack.context.drawImage(pack, this.resX, this.resY, this.resWidth * (375 / _redPack.canvasWidth), this.resHeight * (667 / _redPack.canvasHeight));
      }
    }
  }
  money.prototype.drop = function () {
    //速度叠加
    this.y += moneyEnum[this.type].speed;
    if (this.status == 0
      && _redPack.body.mainpen.y > this.y
      && _redPack.body.mainpen.y < this.y + this.heights
      && _redPack.body.mainpen.x > this.x
      && _redPack.body.mainpen.x < this.x + this.widths) {//
      this.status = 1;
      // _redPack.score += moneyEnum[this.type].value;  //记录总分数
      // _redPack.five_num += 1;                        // 红包个数
      // link.playGoldRing();        // 声音
      if (this.stayY == 0) {      // 第一次点击保留 Y 坐标
        this.stayY = this.y;
      }
    // } else if (this.y >= 1039) {
    } else if (this.y >= _redPack.canvasHeight) {
      // this.status = 2;
    }
    this.draw();
  }
  window.money = money;
})();
