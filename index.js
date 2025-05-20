const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
///Will stretch if window is resized, until refresh. 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = "50px serif";
//document.querySelector("canvas").style.backgroundColor = "red";









//// Event listeners \\\\

/// DOES NOT WORK, VALUES ARE WAY OFF. !!!!!!!!!!!
/// Mouse, updates the mouse object
document.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}); 


/// Keydown, updates the keyPress object
document.addEventListener("keydown", (event) => {});
onkeydown = (event) => {
  var key = event.key;
  switch (key) {
    case "w":
      keyPress.w = true;
      break;
    case "a":
      keyPress.a = true;
      break;
    case "s":
      keyPress.s = true;
      break;
    case "d":
      keyPress.d = true;
      break;
    case "f":
      keyPress.f = true;
      break;
    case "1":
      keyPress.one = true;
      break;
    case "2":
      keyPress.two = true;
      break;
    case "3":
      keyPress.three = true;
      break;
    case "4":
      keyPress.four = true;
      break;
    case "5":
      keyPress.five = true;
      break;
    default:
      break;
  }
};


///Keyup, updates the keyPress object
document.addEventListener("keyup", (event) => {});
onkeyup = (event) => {
  var key = event.key;
  switch (key) {
    case "w":
      keyPress.w = false;
      break;
    case "a":
      keyPress.a = false;
      break;
    case "s":
      keyPress.s = false;
      break;
    case "d":
      keyPress.d = false;
      break;
    case "f":
      keyPress.f = false;
      break;
    case "1":
      keyPress.one = false;
      break;
    case "2":
      keyPress.two = false;
      break;
    case "3":
      keyPress.three = false;
      break;
    case "4":
      keyPress.four = false;
      break;
    case "5":
      keyPress.five = false;
      break;
    default:
      break;
  }
};



//// Objects \\\\


///Used to create player and npcs and such. 
class ACTORCREATOR {
  constructor(x, y, width, height, speed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = color;
  }
}

///Mouses coordinates. Show x,y are where it will be displayed.
var mouse = {
    x: 0,
    y: 0,
    length: 10,
    width: 10,
}


/// Updated by the event listeners.
var keyPress = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false,
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
};


/// Player object           // x , y , width , height , speed , color 
var player = new ACTORCREATOR(150, 300, 100, 100, 10, "green");



///Enemy object
var obama = {
    x: 250,
    y: 400,
    width: 50,
    height: 50,
    speed: 15,
    color: "red",
    targetIndex: 0, 

  //Need a edge case for when distance of cord is equal or less than speed

    moveTowardsCoin: function(){
      //By using the switch cases he can move both y and x at same time!!!!!!! mindBlown.jpeg
      switch (true) {
        case this.x < coins.array[this.targetIndex]['x']:
          this.x += 20;
          break;
        case this.x > coins.array[this.targetIndex]['x']:
          this.x -= 20;
          break;
        //the speed edge case
        case this.speed < coins.array[this.targetIndex]['x'] - this.x:
          this.speed = 1;
          break;
        default:
          break;
      }

      switch (true) {
        case this.y < coins.array[this.targetIndex]['y']:
           this.y += 20;
          break;
         case this.y > coins.array[this.targetIndex]['y']:
           this.x -= 20;
        //the speed edge case
        case this.speed < coins.array[this.targetIndex]['y'] - this.y:
          this.speed = 1;
        default:
          break;
      }

      if(this.y < coins.array[this.targetIndex]['y']){
        this.y += 20;
        return;
      }
      if(this.y > coins.array[this.targetIndex]['y']){
        this.y -= 20;
        return;
      }


    },

    targetNewRanCoin: function(){
      this.targetIndex = ranNum(0, coins.arrayLength - 1);
      this.speed = 15;
    },

}


/// Use index to id different types of coins.
///DO NOT TOUCH VALUES ARE FINE TUNED
///  Coin object list.
var coins = {
  arrayLength: 0,
  array: {},
  ready: false,


  createCoins: function (amt) {
    let temp = 0;
    ready = false;
    for (let i = this.arrayLength; i <   (this.arrayLength) + amt; i++) {
      this.array[i] = {
        index: 1,
        color: "gold",
        x: ranNum(0, canvas.width),
        y: ranNum(0, canvas.height),
        width: 35,
        height: 35,
      };   
      temp ++;
      
    }
    this.arrayLength += temp;
    ready = true;
  },

  renderCoins: function () {
    if(ready){
    for (let i = 0; i < this.arrayLength; i++) {
      ctx.fillStyle = this.array[i]['color'];
      ctx.fillRect(
        this.array[i]['x'],
        this.array[i]['y'],
        this.array[i]['width'],
        this.array[i]['height'],
        
      );
    }
  }
  },

  addCoins: function (amt) {
    let temp = 0;
    ready = false;
    for (let i = this.arrayLength; i < this.arrayLength + amt; i++) {
      /// add new coins with index and this if if if else format.
      if (ranNum(0, 5) == 5) {
        this.array[i] = {
          index: 2,
          color: "greenyellow",
          x: ranNum(0, canvas.width),
          y: ranNum(0, canvas.height),
          width: 45,
          height: 45,
        };
      } else {
        this.array[i] = {
          index: 1,
          color: "gold",
          x: ranNum(0, canvas.width),
          y: ranNum(0, canvas.height),
          width: 35,
          height: 35,
        };
      }
      temp++;
    }
    this.arrayLength += temp;
    ready = true;
  },


  //copys data of last object in array to index then deletes last object.
  removeCoin: function (index, decay){
    if(index[0]){
      //render the coin one last time to change its color.
      if(decay){
      this.array[index[1]]['color'] = 'darkgoldenrod';
            ctx.fillStyle = this.array[index[1]]['color'];
      ctx.fillRect(
        this.array[index[1]]['x'],
        this.array[index[1]]['y'],
        this.array[index[1]]['width'],
        this.array[index[1]]['height'],
      )
    }
    else{clearobj(this.array[index[1]])}

      console.log(this.array[index[1]]);
      console.log(this.array[this.arrayLength - 1]);
      this.array[index[1]]['color'] = this.array[this.arrayLength - 1]['color'];
      this.array[index[1]]['x'] = this.array[this.arrayLength - 1]['x'];
      this.array[index[1]]['y'] = this.array[this.arrayLength - 1]['y'];
      this.array[index[1]]['width'] = this.array[this.arrayLength - 1]['width'];
      this.array[index[1]]['height'] = this.array[this.arrayLength - 1]['height'];
      delete this.array[this.arrayLength - 1];
      this.arrayLength --;
      return true;
  }
    else {return}
  }, 
};


//Score object
var score = {
  showX: 50,
  showY: 50,
  playerScore: 0,
  obamaScore: 0,
  cash: 300,
  playerIncrement: 1,
  obamaIncrement: 1,

 
  addScorePlayer: function (index) {
    if (index == 2) {
      this.cash += 20;
      return;
    }
    this.playerScore += this.playerIncrement;
  },

  addScoreObama: function(){
    this.obamaScore += this.obamaIncrement;
  },

  resetScore: function(){
    this.playerScore = 0;
    this.obamaScore = 0;
  },

  renderScore: function () {
    ctx.font = "50px serif";
  ctx.clearRect(this.showX, this.showY - 50, 500, 100);
  ctx.fillStyle = "red";
  ctx.fillText("Your Score", this.showX, this.showY);
  ctx.fillText(this.playerScore, this.showX + 325, this.showY);
  ctx.fillText("Obama Score", this.showX, this.showY + 50);
  ctx.fillText(this.obamaScore, this.showX + 325, this.showY + 50);
  }
}




var menu = {
  showX: 50,
  showY: 250,
  showMenuX: 50,
  showMenuY: 350,
  menuWidth: 350,
  menuHeight: 225,
  backgroundColor: "black",
  textColor: "red",
  borderColor: "red",
  borderRadiusPX: 5,
  increment: 0,
  menuFontSize: 32,
  pause: false,

  renderPrompt: function () {
    ctx.font = "50px serif";
    ctx.clearRect(this.showX, this.showY - 50, 300, 50);
    ctx.fillStyle = this.textColor;
    ctx.fillText("( f ) for shop", this.showX, this.showY);
  },

  //No idea why -50 is used, but it works.
  renderMenu: function () {
    ctx.font = this.menuFontSize.toString() + "px serif";
    ctx.clearRect(
      this.showMenuX,
      this.showMenuY - 50,
      this.menuWidth,
      this.menuHeight
    );
    ctx.fillStyle = this.borderColor;
    ctx.fillRect(
      this.showMenuX - this.borderRadiusPX,
      this.showMenuY - 50 - this.borderRadiusPX,
      this.menuWidth + this.borderRadiusPX,
      this.menuHeight + this.borderRadiusPX
    );
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
      this.showMenuX,
      this.showMenuY - 50,
      this.menuWidth - this.borderRadiusPX,
      this.menuHeight - this.borderRadiusPX
    );
    ctx.fillStyle = this.textColor;
    ctx.fillText(
      "( 1 ) Speed Increase $50",
      this.showMenuX + 1,
      this.showMenuY
    );
    this.increment++;
    ctx.fillText(
      "( 2 ) Size Increase $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize
    );
    this.increment++;
    ctx.fillText(
      "( 3 ) Point Increase $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 2
    );
    this.increment++;
    ctx.fillText(
      "( 4 ) Trump Bot $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 3
    );
    this.increment++;
    ctx.fillText(
      "( 5 ) Exit Shop",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 4
    );
    this.increment++;
    ctx.fillText(
      "Current big ones $" + score.cash,
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 5
    );
    this.increment++;
  },

  deleteMenu: function(){
    ctx.clearRect(
      this.showMenuX - this.borderRadiusPX,
      (this.showMenuY - 50) - this.borderRadiusPX,
      this.menuWidth + this.borderRadiusPX,
      this.menuHeight + this.borderRadiusPX
    );
  },

  showMenu: function () {
    if (keyPress.f || this.pause == true) {
      this.renderMenu();
      this.pause = true;
        if (keyPress.one == true) {
          if (score.cash >= 25) {
            player.speed += 3;
            score.cash -= 25;
          }
        }
        if (keyPress.two == true) {
          if (score.cash >= 25) {
            player.width += 15;
            player.height += 15;
            score.cash -= 25;
          }
        }
        if (keyPress.three == true) {
          if (score.cash >= 25) {
            score.playerIncrement += 1;
            score.cash -= 25;
          }
        }
        if (keyPress.four == true) {
          if (score.cash >= 25) {
            ///To be added. Add obama but different color and gives points to player.
          }
        }
        if (keyPress.five == true) {
          this.pause = false;
            menu.deleteMenu();
            return;
        }
      }

  },
};


//// Helper functions \\\\ 


///Returns a random num between min and max, inclusive. 
function ranNum (min , max){
    seed = Math.random();
    seed = Math.floor(seed * (max - (min - 1))) + min;
    return seed;
}


///Clears the canvas
function clearScreen () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


///Clears a obj, assuming it has these properties.
function clearobj (obj) {
    ctx.clearRect(obj.x, obj.y, obj.width, obj.height);
}


///Renders a obj, 
function renderObj (obj) {
    ctx.fillStyle =  obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}


///Displays the coordinates of an object. Assuming it has an x and y propertie.
function renderObjCords(obj, showX, showY) {
  ctx.font = "50px serif";
  ctx.clearRect(showX, showY - 50, 335, 50);
  ctx.fillStyle = "red";
  ctx.fillText("X", showX, showY);
  ctx.fillText(obj.x, showX + 70, showY);
  ctx.fillText("Y", showX + 180, showY);
  ctx.fillText(obj.y, showX + 235, showY);
}




//// Main functions \\\\ 


///Will move an object based on the keypress and its speed, assuming speed propertie. 
function move(toMove) {
  if (keyPress.w == true) {
    toMove.y -= toMove.speed;
  }
  if (keyPress.a == true) {
    toMove.x -= toMove.speed;
  }
  if (keyPress.s == true) {
    toMove.y += toMove.speed;
  }
  if (keyPress.d == true) {
    toMove.x += toMove.speed;
  }
}

//[0] bool [1] coin index if param true
function collisionDetection(obj1, obj2, obj2iIsList) {
  if (obj2iIsList == true) {
    for (let i = 0; i < obj2.arrayLength; i++) {
      if (
        obj1.x + obj1.width - obj2.array[i].x >= 0 &&
        obj2.array[i].x + obj2.array[i].width - obj1.x >= 0 &&
        obj1.y + obj1.height - obj2.array[i].y >= 0 &&
        obj2.array[i].y + obj2.array[i].height - obj1.y >= 0
      ) {
        return [true, i];
      }
    }
    return [false];
  } else {
    if (
      obj1.x + obj1.width - obj2.x >= 0 &&
      obj2.x + obj2.width - obj1.x >= 0 &&
      obj1.y + obj1.height - obj2.y >= 0 &&
      obj2.y + obj2.height - obj1.y >= 0
    ) {
      return [true];
    } else {
      return [false];
    }
  }
}


///Excutes a list of functions if collisionDectection is true.
function onCollisionPlayer(passColFun){
  if(passColFun[0]){
  coins.removeCoin(passColFun,false);
  score.addScorePlayer(coins.array[passColFun[1]]['index']);
  console.log("coin added " + coins.array[passColFun[1]]['index']);
  coins.addCoins(1);
  }
  if (passColFun[1] == obama.targetIndex) {
    obama.targetNewRanCoin();
  }
}



function onCollisionObama(passColFun){
  if (passColFun[0]) {
    coins.removeCoin(passColFun, false);
    score.addScoreObama();
    obama.targetNewRanCoin();
     console.log("coin added");
     console.log(coins.array);
    coins.addCoins(1); 
  }
}

//// THE GAME LOOP \\\\ 

main = () => {
  window.requestAnimationFrame(main);

  // LOOP CONTENTS \\

  clearobj(player);
  clearobj(obama);


  obama.moveTowardsCoin();
  move(player);

  
  score.renderScore();
  menu.renderPrompt();
  renderObjCords(obama, 50, 200);
  renderObjCords(player, 50, 150);

  renderObj(player);
  renderObj(obama);
 
  console.log(coins.array);
  console.log(coins.arrayLength);
  coins.renderCoins(); 
  
  
  menu.showMenu();


  
onCollisionPlayer(collisionDetection(player,coins,true));
onCollisionObama(collisionDetection(obama,coins,true));



  // LOOP CONTENTS \\
};




////Add functions to call before game loop starts, here \\\\

coins.createCoins(5);
coins.addCoins(5);
obama.targetNewRanCoin;


///Starts the game loop

main();