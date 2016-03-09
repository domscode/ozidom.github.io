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
    Game.display.draw(this._x, this._y, "@", "green");
}

Player.prototype._checkBox = function () {
    //console.log(Game.map[key]); 
    var key = this._x + "," + this._y;
    //console.log(Game.map[key]); 
    if (Game.map[key] != "d" && Game.map[key] != "i" ) {
        alert("There is no box here!");
    } 
    else if (key == Game.door ) {//&& Game.song.getAnswer()==Game.answer

        var string = Game.song.getSong(Game.level);

        $("#gameText").html(string+"Answer:<input id='val'></input");
        $("#gameText" ).dialog({
            autoOpen: true,
            buttons: [
                {
                    text: "Solve",
                    click: function() {
                         //do something
                         var modalAnswer = $("#val").val();
                         Game.answer = modalAnswer;

                         $( this ).dialog( "close" );
                         callBack(modalAnswer)
                    }
                }
            ],
            width: 630,
            position: { my: 'top', at: 'top+150' },
            modal: true,
            resizable: false,
            closeOnEscape: false
        });
        //window.removeEventListener("keydown", this);
    } else if (key == "i")
    {
        alert("item");
    }  
    else if (Game.song.getAnswer(Game.level)!=Game.answer) 
    {
         alert("Answer is wrong");
    }
    else {
        alert("This box is empty :-(");
    }
}
function callBack(value){
    var answer = value
    //alert(answer);
    //alert(Game.answer);
    if (answer.trim() === Game.answer.trim() ) 
        {
            Game.level++;
           // alert('You are going to level : ' + Game.level);
            //this.Player = null;
            Game.engine.lock();
            Game._startLevel();
        }
        if (this.level==5)
        {
            alert("Hooray! You found the final door and won this game.");
            Game.engine.lock();
        }
        
        Game.engine.lock();
}