var Monster = function (x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}

Monster.prototype.getSpeed = function () { return 50; }

Monster.prototype.act = function () {
    var x = Game.player.getX();
    var y = Game.player.getY();

    var passableCallback = function (x, y) {
        return (x + "," + y in Game.map);
    }
    var astar = new ROT.Path.AStar(x, y, passableCallback, { topology: 4 });

    var path = [];
    var pathCallback = function (x, y) {
        path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);

    path.shift();
    if (path.length <= 1) {
        Game.engine.lock();
         //$("#gameSubText").text("You've been damaged");
         Game.isInCombat = true;
         //handle combat

         //Game.isGameOver = true;
    } else {

        x = path[0][0];
        y = path[0][1];
        if (Game.map[this._x + "," + this._y]!="M")
        {
            Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
            this._x = x;
            this._y = y;
            this._draw();
        }
    }
}

Monster.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "M", "red");
}
