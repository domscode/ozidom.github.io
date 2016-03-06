var Player = function (x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}

Player.prototype.getSpeed = function () { return 100; }
Player.prototype.getX = function () { return this._x; }
Player.prototype.getY = function () { return this._y; }

Player.prototype.act = function () {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}

Player.prototype.handleEvent = function (e) {
    console.log('KD');
    var code = e.keyCode;
    if (code == 13 || code == 32) {
        this._checkBox();
        return;
    }

    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    /* one of numpad directions? */
    if (!(code in keyMap)) { return; }

    /* is there a free space? */
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    //window.removeEventListener("keydown", this);
    Game.engine.unlock();
}

Player.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

Player.prototype._checkBox = function () {
    //console.log(Game.map[key]); 
    var key = this._x + "," + this._y;
    console.log(Game.map[key]); 
    if (Game.map[key] != "*" && Game.map[key] != "i" ) {
        alert("There is no box here!");
    } else if (key == Game.door) {
        Game.level++;
        alert('You are going to level : ' + Game.level)
        Game.init();

        if (this.level==5)
        {
            alert("Hooray! You found an door and won this game.");
            //Game.engine.lock();
        }
        
        Game.engine.lock();
        //window.removeEventListener("keydown", this);
    } else if (key == "i")
    {
        alert("item");
    }       else {
        alert("This box is empty :-(");
    }
}