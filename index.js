var margin = {top: 50, right: 50, bottom: 10, left: 60},
    width = 980 - margin.left - margin.right,
    height = 435 - margin.top - margin.bottom;
bar_height=height-15;
var formatPercent = d3.format("s");//y軸數字

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([bar_height, 0]);
	
var y_right = d3.scale.linear()
    .domain([0,1000])
    .range([bar_height, 0]);
	
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
var yAxisRight = d3.svg.axis()
    .scale(y_right)
    .orient("right")
    .tickFormat(formatPercent);
/* Initialize tooltip */
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white'>" + "       【"+d.locate + "】"+"</span>"+"<br>"+"<strong>平均綜合所得(千元):</strong> <span style='color:red'>" + d.avg_money + "</span>";
  })

var tip_circle = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-15, 0])
  .html(function(d) {
    return "<span style='color:white'>" + "       【"+d.locate + "】"+"</span>"+"<br>"+"<strong>所得變異係數:</strong> <span style='color:red'>" + d.var_money+ "</span>";
  })  

  
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg_pie = d3.select("body").append("svg")
    .attr("width", 300)
    .attr("height",400)
  .append("g")
    .attr("transform", "translate(" + (width-700)+ "," + 200 + ")");
/* Invoke the tip in the context of your visualization */
svg.call(tip);
svg.call(tip_circle);


function chgSelect(){
	var light='#4F4F4F';
	if (document.getElementById("choose").value=='0'){
		//d3.select("#test").style("opacity", newOpacity);
		for (i=0;i<22;i++){
					d3.select("#small"+i)
					.attr("height",0);
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 0
						})
		}
    }
	if (document.getElementById("choose").value=='1'){
		for (i=0;i<22;i++){
			if (i==0||i==7){
					d3.select("#small"+i)
					.attr("height",15);
					
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 2
						})				
			}
			else{
					d3.select("#small"+i)
					.attr("height",0);	
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 0
						})					
			}
		}
    }
	if (document.getElementById("choose").value=='2'){
		for (i=0;i<22;i++){
			if (i==1||i==6||i==10||i==20||i==21){
					d3.select("#small"+i)
					.attr("height",15);

					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 2
						})
			}
			else{
					d3.select("#small"+i)
					.attr("height",0);
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 0
						})				
			}
		}
    }
	if (document.getElementById("choose").value=='3'){
		for (i=0;i<22;i++){
			if (i==13||i==2||i==4||i==12){
					d3.select("#small"+i)
					.attr("height",15);
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 2
						})
			}
			else{
					d3.select("#small"+i)
					.attr("height",0);	
					d3.select("#bar"+i)
					  .style({
							//fill: small_color, 
							stroke: light,
							'stroke-width': 0
						})			
			}
		}
    }
	if (document.getElementById("choose").value=='4'){
		for (i=0;i<22;i++){
			if (i!=0&&i!=7&&i!=1&&i!=6&&i!=10&&i!=20&&i!=21&&i!=2&&i!=4&&i!=12&&i!=13){
					d3.select("#small"+i)
					.attr("height",15);
					d3.select("#bar"+i)
					  .style({
							stroke: light,
							'stroke-width': 2
						})
			}
			else{
					d3.select("#small"+i)
					.attr("height",0);		
					d3.select("#bar"+i)
					  .style({
							//fill: small_color, 
							stroke: light,
							'stroke-width': 0
						})						
			}
		}
    }
};
d3.csv("data/total.csv", type,function(error, data) {


  x.domain(data.map(function(d) { return d.locate; }));//因为横坐标不是数字，是字母，所以需要返回map格式  
  y.domain([0, d3.max(data, function(d) { return d.avg_money; })]);
////////highlight
  	small_color="#BEBEBE";
  svg.selectAll(".small")
      .data(data)
    .enter().append("rect")
      .attr("class", "small")
	  .attr("x",function(d) { return x(d.locate); })
	  .attr("y",height-10)
	  .attr("width", 38)
	  .attr("height",0)	
	  .style({
			fill: small_color, 
		})
	  .attr("id",function(d,i) { return "small"+i;})

	
 svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bar_height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
	  .style("fill", "#AA0000")
      .call(yAxis)
    .append("text")
      .attr("transform", "translate(50,-25)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("平均綜合所得(千元)");

  svg.append("g")
      .attr("class", "y axis")
	  .attr("transform", "translate(" + (width-4) + " ,0)")
	  .style("fill", "steelblue")
	  .attr("id", "redAxis")
      .call(yAxisRight)
    .append("text")
      .attr("transform", "translate(50,-25)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("所得變異係數");
  		 
  var color = d3.scale
              .linear()
              .domain([1,4])
             // .range(['#FFC0CB', '#AFEEEE']);
			  .range(['#AFEEEE', '#FFC0CB']);


 circle_color=['#BBFF66','#77DDFF','#FFAA33'];
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.locate)+4; })
      .attr("width", x.rangeBand()-8)
      .attr("y", function(d) { return y(d.avg_money); })//纵轴方向上的起点 
	  .attr("fill", function(d) {
		//    return 'steelblue';
		    if(d.avg_money>600 && d.avg_money<750){return color(1);}
			if(d.avg_money>750 && d.avg_money<900){return color(2);}
			if(d.avg_money>900 && d.avg_money<1050){return color(3);}
			else {return color(4);}
	  })
	  .attr("id",function(d,i) { return "bar"+i;})
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
	  .attr("height",0)	
	  .transition()
	  .duration(800)
	  .attr("height",function(d){return bar_height-y(d.avg_money);})

	  
	  
//折現+原點
	var line = d3.svg.line()
		.x(function(d) { return x(d.locate)+4+(x.rangeBand()-8)/2; })
		.y(function(d) { return y_right(d.var_money); });
    svg.append("path")
      .attr("class", "line2")
      .attr("d", line(data))
	svg.append('g').selectAll('circle')
	  .data(data)
	  .enter()
	  .append('circle')
      .attr('cx', function(d) { return x(d.locate)+4+(x.rangeBand()-8)/2; })
      .attr('cy', function(d) { return y_right(d.var_money); })
      .attr('r', 4)
      .attr("class", "circle")
      .attr("fill",'steelblue')
	  .attr("id",function(d,i) { return "circle"+d.locate;})
	  .on('mouseover', tip_circle.show)
      .on('mouseout', tip_circle.hide);
     
	  
//輔助線
	/////line
	svg.append("line")
		.attr("x1",0)
		.attr("y1",y(830.1072))
		.attr("x2",width-10)
		.attr("y2",y(830.1072))
		.attr("stroke","#AA0000")
		.attr("stroke-width",2)
		.attr("stroke-dasharray", 8)
		.attr("id","avg_line");
	svg.append("text")
		.attr("x",20)
		.attr("y", y(880))
		.attr("dy", ".35em")
		.attr("fill","#AA0000")
		.style("font-weight", "bold")
		.attr("id","avg_word")
		.text("平均:830.1072(千元)");

	svg.append("line")
		.attr("x1",14)
		.attr("y1",y_right(177.9941))
		.attr("x2",width)
		.attr("y2",y_right(177.9941))
		.attr("stroke","steelblue")
		.attr("stroke-width",2)
		.attr("stroke-dasharray", 8)
		.attr("id","var_line");
	svg.append("text")
		.attr("x",width-90)
		.attr("y", y_right(220))
		.attr("dy", ".35em")
		.attr("fill","steelblue")
		.style("font-weight", "bold")
		.attr("id","var_word")
		.text("平均:177.9941");
		
	  //button ->show hide
	d3.select("#avg_line").style("opacity", 0);
	d3.select("#avg_word").style("opacity", 0);
	d3.select("#var_line").style("opacity", 0);
	d3.select("#var_word").style("opacity", 0);
	var btn1=d3.select('#btn1')	
		.on("click", function(){
			// Determine if current line is visible
			var active   = avg_line.active ? false : true,
			  newOpacity = active ? 1 : 0;
			// Hide or show the elements
			d3.select("#avg_line").style("opacity", newOpacity);
			d3.select("#avg_word").style("opacity", newOpacity);
			// Update whether or not the elements are active
			avg_line.active = active;
		})
		//.text("總平均所得");
	var btn2=d3.select('#btn2')	
		.on("click", function(){
			// Determine if current line is visible
			var active   = var_line.active ? false : true,
			  newOpacity = active ? 1 : 0;
			// Hide or show the elements
			d3.select("#var_line").style("opacity", newOpacity);
			d3.select("#var_word").style("opacity", newOpacity);
			// Update whether or not the elements are active
			var_line.active = active;
		})
	/////////圖解
  graph_x=550;
  graph_x2=graph_x+120;
  graph_h=-50;
  graph_width=65;

  svg.append("text")
      .attr("x",graph_x-120)
      .attr("y", graph_h+10)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text("平均綜合所得(千元)");
  svg.append("rect")
      .attr("x",graph_x)
      .attr("y",graph_h)
      .attr("width", graph_width)
      .attr("height", 18)
      .style("fill",color(1))	  
  svg.append("text")
      .attr("x",graph_x+10)
      .attr("y", graph_h+10)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text("600-750");
  svg.append("rect")
      .attr("x",graph_x+graph_width+4)
      .attr("y",graph_h)
      .attr("width", graph_width)
      .attr("height", 18)
      .style("fill",color(2))	  
  svg.append("text")
      .attr("x",graph_x+graph_width+13)
      .attr("y", graph_h+10)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text("750-900");	  
  svg.append("rect")
      .attr("x",graph_x+graph_width*2+8)
      .attr("y",graph_h)
      .attr("width", graph_width)
      .attr("height", 18)
      .style("fill",color(3))	  
  svg.append("text")
      .attr("x",graph_x+graph_width*2+15)
      .attr("y", graph_h+10)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text("900-1050");	
  svg.append("rect")
      .attr("x",graph_x+graph_width*3+12)
      .attr("y",graph_h)
      .attr("width", graph_width)
      .attr("height", 18)
      .style("fill",color(4))	  
  svg.append("text")
      .attr("x",graph_x+graph_width*3+20)
      .attr("y", graph_h+10)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text(">= 1050");	  

  svg.append("text")
      .attr("x",graph_x-90)
      .attr("y", graph_h+30)
      .attr("dy", ".35em")
	  .style("font-weight", "bold")
	  .text("所得變異係數");
	svg.append('line').attr({
		x1: graph_x,
		y1: graph_h+30,
		x2: graph_x+31,
		y2: graph_h+30
	})
	.attr("class", "line2")
  svg.append('circle')
	//  .attr("transform","translate(" + margin.left + "," +  margin.top  + ")")
      .attr('cx', graph_x+15)
      .attr('cy',graph_h+30 )
      .attr('r', 4)
      .attr("fill",'steelblue');
  svg.append("text")
      .attr("x",graph_x-90)
      .attr("y", graph_h+46)
      .attr("dy", ".35em")
	//  .style("font-weight", "bold")
	  .text("(變異係數越大，貧富差距越大)");

////sort1
	d3.select(".asc").on("change", change1);
	d3.select(".desc").on("change", change2);

  function change1() {
	/////////// //line&circle
    var x0 = x.domain(data.sort(this.checked=function(a, b) { return b.avg_money - a.avg_money; })
      //  : function(a, b) { return a.avg_money - b.avg_money; })//return d3.ascending(a.locate, b.locate);
        .map(function(d) { return d.locate; }))
        .copy();
//////////
	d3.csv("data/total.csv", type,function(error, data2) {
		data2=data2.sort(function(a,b){return b.avg_money - a.avg_money;});
		var line1 = d3.svg.line()
		.x(function(d) {
			//return x(d.locate)+(x.rangeBand()-5)/2; 
			return x(d.locate)+4+(x.rangeBand()-8)/2;
			//return xx;
		})
		.y(function(d) { return y_right(d.var_money); });
		
		svg.selectAll(".line2")
			.data(data2)
			.transition()
			.duration(1500)
			.attr("d", line1(data2))
			//.attr("d" , function(d) {return })
		svg.selectAll('circle')
		  .data(data2)
		  .transition()
		  .duration(1500)
		  .attr('cy', function(d) { return y_right(d.var_money); })		
	});		
    ////////////line
	////////////bar 與字體相連
	    svg.selectAll(".small")
        .sort(function(a, b) { return x0(a.locate) - x0(b.locate); });
    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.locate) - x0(b.locate); });//return x0(a.locate) - x0(b.locate);
    var transition = svg.transition().duration(800),
        delay = function(d, i) { return i * 50; };
	transition.selectAll(".small")
        .delay(delay)
        .attr("x", function(d) { return x0(d.locate); })
	transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x(d.locate)+4; })
	
	//x軸跟著變
    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }	
	
  function change2() {
////////////line & circle

  //////bar
   var x0 = x.domain(data.sort(this.checked=function(a, b) { return b.var_money - a.var_money; })
     //   : function(a, b) { return a.avg_money - b.avg_money; })//return d3.ascending(a.locate, b.locate);
        .map(function(d) { return d.locate; }))
        .copy();
//////////
	d3.csv("data/total.csv", type,function(error, data2) {
		data2=data2.sort(function(a,b){return b.var_money - a.var_money;});
		var line1 = d3.svg.line()
		.x(function(d) {
			return x(d.locate)+4+(x.rangeBand()-8)/2; 
			//return xx;
		})
		.y(function(d) { return y_right(d.var_money); });
		
		svg.selectAll(".line2")
			.data(data2)
			.transition()
			.duration(1500)
			.attr("d", line1(data2))
			//.attr("d" , function(d) {return })
		svg.selectAll('circle')
		  .data(data2)
		  .transition()
		  .duration(1500)
		  .attr('cy', function(d) { return y_right(d.var_money); })		
	});
	//bar 與字體相連
    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.locate) - x0(b.locate); });//return x0(a.locate) - x0(b.locate);
    svg.selectAll(".small")
        .sort(function(a, b) { return x0(a.locate) - x0(b.locate); });
		
    var transition = svg.transition().duration(800),
        delay = function(d, i) { return i * 50; };
		
    transition.selectAll(".small")
        .delay(delay)
        .attr("x", function(d) { return x(d.locate); })
    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x(d.locate)+4; })

	transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }
  
});

function type(d) {
  d.avg_money = +d.avg_money;
  return d;
}