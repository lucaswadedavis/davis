davis=
{
random:function (x){return (Math.floor(Math.random()*x));},

bell: function (x)
	{
		var i=Math.round((davis.random(x)+davis.random(x)+davis.random(x))/3);
		return i;
	},

randomColor:function (x,full){
	if (x){	x=x.toLowerCase();}
	else{x=="none"}
	if (!full){var full=false;}

	var red=davis.random(255);
	var green=davis.random(255);
	var blue=davis.random(255);
	if (x=="grey" || x=="gray" || x=="fullgrey" || x=="fullgray"){
		blue=red;
		green=red;
		}
	if (x=='warm' || x=='hot'){
		red=200+davis.random(55);
		blue=davis.random(30);
	}
	if (x=='cool' || x=='cold'){
		blue=100+davis.random(155);
		red=davis.random(50);
	}
	if (x=="mammal" || x=="mammalian"){
		red=160+davis.random(85);
		green=red-40;
		blue=green/2;
	}
	var color="rgb("+red+","+green+","+blue+")";

	if (full==true){
		var text="#eee";
		if ((red+green+blue)>400){text="#111";}
		return {red:red,green:green,blue:blue,rgb:color,text:text};
		}
	else{
		return color;
		}	
	},

randomWord:function(x){
	if (!x){x=1;}
	var vo=["a","e","i","o","u"];
	var con=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
	var phrase=[];
	for (var j=0;j<x;j++){
		var word="";
		for (var i=0;i<(1+davis.random(3));i++){
			word+=davis.pick(con)+davis.pick(vo);
			}	
		if (davis.random(5)>2){
			word+=davis.pick(con);
			}
		phrase.push(word);
	}
	word=phrase.join(" ");
	return word;
},
	
pick: function (x)
	{return x[davis.random(x.length)];},

sumTo:function(x){
	if (!x){return false;}
	var y=[];
	while (x>0){
		var redux=1+davis.random(x);
		y.push(redux);
		x=x-redux;
	}
	return y;
	},

//this takes two arrays - one the source of new material, the other saved material from the past, and decides which to return an element from, then selects a random element from the ancestral or mutational array.
darwin:function(mutation,ancestry)
	{
	var anar=ancestry.length;
	var m=(9*anar*anar)/((anar*anar)+100);
	var d=1+this.random(10);
	if (m>d){ return this.pick(ancestry);}
	else{ return this.pick(mutation);}
	},

style:function(selector,values){
//requires jQuery
		if (!jQuery){return false};
		if ($("head style#dynamic").get().length==0){
			$("head").append("<style id='dynamic'></style>");
		}
		if (selector=="clear" || !selector){$("head style#dynamic").html("");}

		var s=selector+"{";
		for (i in values){
			s+=i+":"+values[i]+";";
		}
		s+="}";

		$("head style#dynamic").append(s);
	},

grid:function(xSteps,ySteps,bounds){
	var grid=[];
	var b=bounds;
	var xInterval=(bounds.right-bounds.left)/xSteps;
	var yInterval=(bounds.bottom-bounds.top)/ySteps;
	for (var i=0;i<xSteps;i++){
		grid.push([]);
		for (var j=0;j<ySteps;j++){
			var left=b.left+(xInterval*i);
			var top=b.top+(yInterval*j);
			var width=xInterval;
			var height=yInterval;
			grid[i].push(this.quickBox(left,top,width,height));
			}
		}

	return grid;
	},

gridLegend:function(grid,context){
//requires Raphael
	grid.legend=[];
	for (var i=0;i<grid.length;i++){
		for (var j=0;j<grid[i].length;j++){
			var locus=grid[i][j];
			var lll=context.text(locus.centerX,locus.centerY,(i+","+j))
				.attr({"font-size":30,"opacity":0});
			grid.legend.push(lll);
		}
	}

	grid.show=function(ms){
//requires Raphael
		var ms=ms || 3000;
		for (var i=0;i<this.legend.length;i++){
			this.legend[i].animate({"opacity":1},(ms/10));
		}
		setTimeout(function(){
			for (var i=0;i<grid.legend.length;i++){
				grid.legend[i].animate({"opacity":0},(ms/10));
			}
		},ms);
	};
	
	return grid;
},

quickBox:function(x,y,w,h){
	var box={};
	box.top=y;
	box.bottom=y+h;
	box.left=x;
	box.right=x+w;
	box.centerX=(box.right+box.left)/2;
	box.centerY=(box.bottom+box.top)/2;
	box.width=w;
	box.height=h;
	return box;
},

table:function(array,bounds,context){
	var b=bounds;
	var table=array;
	var c=context;

	var xStep=0;
	for (key in table[0]){xStep++;}
	var yStep=table.length+1;
	var grid=davis.grid(xStep,yStep,b);
	console.log(c);
	console.log(b);
	console.log(grid);

	var x=0;
	for (var key in table[x]){
		c.text(grid[x][0].centerX,grid[x][0].centerY,key)
			.attr({"font-size":20});
		x++;
	}

	for (var i=1;i<(table.length+1);i++){
		var x=0;
		for (var key in table[i-1]){
			c.text(grid[x][i].centerX,grid[x][i].centerY,table[i-1][key])
				.attr({"font-size":15});
			x++;
		}
	}
},

maybe:function(n,d,f){
	var d=davis.random(d);
	if (d<n){
		f.call();
	}
	else{return false;}
}

};
