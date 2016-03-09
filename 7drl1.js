var Game = {
    display: null,
    display2: null,
    map: {},
    engine: null,
    player: null,
    monster: null,
    items: [],
    door: null,
    song: null,
    level: 0,
    answer: null,

    init: function () {

        if (this.display == null)
        {
            console.log("starting");
            
            this.display = new ROT.Display({ spacing: 1.1 });

            
            var ab = $("#gameDisplay")[0];
            ab.appendChild(this.display.getContainer());
            this.level = 1;
        }

        //this.display.clear();
        //this.player = null;
        //this.display = null;

        this.map = {};
        this.engine = null;
        this.player = null;
        this.monster = null;
        this.items = [];
        this.door = null;
        this.song = null;
        //this.level: 0,
        //answer: null,
        
        this._startLevel();
    },

    _startLevel: function () {
        this.map = {};
        
        this.display.clear();

        this._generateMap();   
       
        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.monster, true);

        Game.items = [];
        for (var i = 0; i <5;i++) {
            //var itemInstance = this._createBeing(Item, freeCells);
            //var itemInstance = new Item();
            var itemInstance = Game.items[i];
            scheduler.add(itemInstance, true);
        }

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },
    _generateMap: function () {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function (x, y, value) {
            if (value) { return; }

            var key = x + "," + y;
            this.map[key] = ".";
            freeCells.push(key);
        }

        digger.create(digCallback.bind(this));

        this._generateDoor(freeCells);

        console.log("creating player");
       ;

        this._drawWholeMap();
        //if (this.player == null)
        //{
            
        //}
        
        this.player = this._createBeing(Player, freeCells,this.player)
        this.monster = this._createBeing(Monster, freeCells,null);
        this.song = new song(this.level);

        for (var i = 0; i <5;i++) {
            //v = new Item();
            //console.log(itemInstance);
            //var key = x + "," + y;
            //this.map[key] = "i";
            var itemInstance = this._createBeing(Item, freeCells,null);
            var key = itemInstance.x + "," + itemInstance.y;
            this.map[key] = "i";
            Game.items.push(key);
            freeCells.push(key);
            //scheduler.add(this.itemInstance, true);
        }
    },

    _createBeing: function (what, freeCells, being) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        if (being == null)
            return new what(x, y);
        else
        {
            being._x = x;
            being._y = y;
            return being;
        }
    },

    _generateDoor: function (freeCells) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);

            this.map[key] = "d";
            this.door = key; //its the doo
    },

    _drawWholeMap: function () {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
            //console.log("_drawWholeMap");
            if (this.map[key]=="@")
                console.log("_drawWholeMap bard");
        }
    }
};

var Item = function (x,y) {
    this._x = x;
    this._y = y;
    this._draw();
}

Item.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "i", "#ff0");
}

$(document).ready(function(e) {   
    Game.init();
 });



