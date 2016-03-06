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

    init: function () {

        if (this.display == null)
        {
            console.log("starting");
            this.display = new ROT.Display({ spacing: 1.1 });
            var ab = $("#gameDisplay")[0];
            ab.appendChild(this.display.getContainer());
            this.level = 1;
        }
        this.map = [];
        
        
        this.display.clear();
        var str = "WTHI IS ASdASDASDA" +
        "<a href='http://domscode.com'>Click Here</a><br/>" +
        "ASDASDASDASDASDASDASDASDASD<br/>SDASDASDASDASDASDASDASASDASDASD" +
         "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
          "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
           "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
            "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
             "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
              "ASDASDASDASDASDASDASDASDASD<br/>SDASDASDASDASDASDASDASASDASDASD" +
         "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
          "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
           "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
            "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
             "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
              "ASDASDASDASDASDASDASDASDASD<br/>SDASDASDASDASDASDASDASASDASDASD" +
         "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
          "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
           "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
            "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
             "ASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASDASASDASDASD<br/>" +
        "<a href='http://domscode.com' target='web'>Click Here</a><iframe width='100%' height='100' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/177159515&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>";
       
        var filePath = "song.txt";



       
        //this.display.drawText(60,  2, str);

        
        //document.body.appendChild(this.display.getContainer());
        this._generateMap();

        var string = this.song.getSong();

        $("#gameText").html(string);
        $("#gameText" ).dialog({
            autoOpen: true,
            width: 630,
            position: { my: 'top', at: 'top+150' },
            modal: true,
            resizable: false,
            closeOnEscape: false
        });

        

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

        this._generateBoxes(freeCells);
        this._drawWholeMap();

        this.player = this._createBeing(Player, freeCells);
        this.monster = this._createBeing(Monster, freeCells);
        this.song = new song(this.level);

        for (var i = 0; i <5;i++) {
            //v = new Item();
            //console.log(itemInstance);
            //var key = x + "," + y;
            //this.map[key] = "i";
            var itemInstance = this._createBeing(Item, freeCells);
            var key = itemInstance.x + "," + itemInstance.y;
            this.map[key] = "i";
            Game.items.push(key);
            freeCells.push(key);
            //scheduler.add(this.itemInstance, true);
        }
    },

    _createBeing: function (what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        return new what(x, y);
    },

    _generateBoxes: function (freeCells) {
        for (var i = 0; i < 2 * Game.level; i++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);

            this.map[key] = "*";
            if (!i) { this.door = key; } //its the door
        }
    },

    _drawWholeMap: function () {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
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



