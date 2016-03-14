// obvuscation from : https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
var song = function (level) {
    this._level = level;
}

song.prototype.getAnswer = function (level) {
    var riddle;
    switch(level) {
    case 1:
		    riddle = "how";
        	break;
    case 2:
        	riddle = "you";
        	break;
    case 3:
        	riddle = "were";
        	break;
    default:
        	riddle = "";	
    }

    return riddle;
}

//TODO:swicth level 
song.prototype.getSong = function (level) {
	var SongTextHTML;
	switch(level) {
    case 1:
		    SongTextHTML = 
		    "<div style='font-size:small;font-family:courier;'>"+
		    "Open t<b>h</b>e door<br/>"+
		    "and look in<br/>"+
		    "and walk around<br/>"+
		    "you found<br/>"+
		    "<br/>Walking ahead<br/>"+
		    "turning left<br/>"+
		    "see what you can find<br/>"+
		    "Remind<br/><br/>"+
		    "Open the door<br/>"+
		    "to my heart and you<br/>"+
		    "will rise<br/>"+
		    "slowly<br/><br/>"+
			"Open the door<br/>"+
			"to my heart and<br/>"+
			"you will rise<br/>"+
			"slowly <br/>" +
			"<iframe width='100%' height='100' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/250630225&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe><div>"+
		    "<br><b> Riddle: </b>asking the question, on the first line, at the middle of the middle<br/>";
        break;
    case 2:
        	SongTextHTML = 
			"<div style='font-size:small;font-family:courier;'>cut from the days and the lights<br/>" + 
			"didn't see what came over<br/>" + 
			"was no feeling up there<br/>" + 
			"there was something seeping<br/>" + 
			"deep underground<br/>" + 
			"think i heard you <b>w</b>eeping<br/>" + 
			"faded by the memory of light<br/>" + 
			"taken by the memory of night<br/>" + 
			"but the light that shines <br/>" + 
			"shines above you<br/>" + 
			"and the light that shines<br/> " + 
			"shines above you<br/>" + 
			"deep underground<br/>"+
			"<iframe width='100%' height='100' scrolling='no' frameborder='no' src=''></iframe>" +
			"<br><b> Riddle: </b>before the tears<br/>";
        break;
     case 3:
        	SongTextHTML = 
			"<div style='font-size:small;font-family:courier;'>I'm doing time<br/>" + 
			"paid the price<br/>" + 
			"with out hope or even sight<br/>" + 
			"and i know, i know<br/>" + 
			"that i feel for you<br/>" + 
            "<br/>" + 
			"caught in the mine<br/>" + 
			"down too far<br/>" + 
			"can not make it any more<br/>" + 
			"and i know, i kno<b>w</b><br/>" + 
			"that i feel for you<br/>" + 
			"<br/>" + 
			"What can I do<br/>" +  
			"What can I say <br/>" + 
			"What can I do<br/>" + 
			"to undo<br/><br>" +
			"<iframe width='100%' height='100' scrolling='no' frameborder='no' src=''></iframe>" +
			"<br><b> Riddle: </b>the last time you know, find the last, then head north along the edge, till you reach the mine<br/>" 
        break;
    default:
        	SongTextHTML = "";
	}
    return SongTextHTML;
}


