
// Store a local reference to jQuery and Underscore.
var $ = window.jQuery;
var _ = window._;

var Chartabull = window.Chartabull = function(el, type, data, options, chartText){
  _.extend(this, options);
  var chartValue;
  if(type == 'line'){
    this.drawLineChart(el, data);
    // The text displayed is the last value in the set
    chartValue = _.last(data);
    this.buildText(el, chartValue, chartText);
  } else if(type == 'pie'){
    this.drawPieChart(el, data);
    // The text displayed is a percentage
    // round it just a wee bit
    chartValue = Math.round((data[0]/data[1] * 100)*10)/10;
    this.buildText(el, chartValue + '%', chartText);
  } else if(type == 'bar'){
    this.drawBarChart(el, data);
    chartValue = _.reduce(data, function(a, b){ return a + b; }, 0);
    this.buildText(el, chartValue, chartText);
  } else if(type == 'progress'){
    this.drawProgressBar(el, data);
  }
};

_.extend(Chartabull.prototype, {

  // Font Stylings used in text laid on top
  textColor: '#777;',
  textPadding: 20,
  barPadding: 2,
  secondaryFont: "normal 24px 'helvetica neue', arial, verdana, sans-serif",
  primaryFont: "bold 50px 'helvetica neue', arial, verdana, sans-serif",

  // Background of Chart
  backgroundColor:  "#ffffff",
  secondaryColor:   "#dedede",
  chartColor: "#cccccc",

  // Drop some text on the graph
  buildText: function(el, chartValue, chartText){
    var height  = el.height();

    var context = el[0].getContext("2d");

    context.fillStyle = this.textColor;
    context.font = this.primaryFont;
    context.fillText(chartValue, this.textPadding, height-50);
    context.font = this.secondaryFont;
    context.fillText(chartText, this.textPadding, height-this.textPadding);

    return this;
  },
  drawLineChart: function(el,data){
    var height = el.height(),
        width = el.width(),
        dataSize = data.length,
        max = _.max(data),
        segmentWidth = width/(dataSize-1),
        segmentHeight = height/max;

    var drawContext = el[0].getContext("2d");

    // Fill the background
    drawContext.fillStyle = this.backgroundColor;
    drawContext.fillRect(0,0, width, height);

    // Begin our path at the bottom left of the chart area
    drawContext.beginPath();
    drawContext.moveTo(0, height);

    // Draw the lines
    $.each(data, function(val){
      var current_x = val * segmentWidth;
      var current_y = (height) - (data[val] * segmentHeight);
      drawContext.lineTo(current_x, current_y);
    });

    // Close out the graph (connect to bottom right)
    drawContext.lineTo(width, height);
    drawContext.closePath();

    // Apply optional styles
    drawContext.fillStyle = this.chartColor;
    drawContext.fill();

    return this;
  },
  drawPieChart: function(el,data){
    var height = el.height(),
        width = el.width(),
        drawContext = el[0].getContext("2d");


    var x = width/2;
    var y = height/2;
    var r = _.min([width,height])/2;

    // Fill the background
    drawContext.fillStyle = this.secondaryColor;
    drawContext.arc(x, y, r, 0, (Math.PI * 2), false);
    drawContext.fill();

    // Draw the arc
    drawContext.beginPath();
    drawContext.arc(x, y, r, 0, (Math.PI * 2) * (data[0]/data[1]), false);
    drawContext.lineTo(x,y);
    drawContext.closePath();
    drawContext.fillStyle = this.chartColor;
    drawContext.fill();

    // Cut out the internal arc by dropping a filled circle on top
    // that is the background color
    drawContext.beginPath();
    drawContext.arc(x,y,r/2,0, (Math.PI * 2), false);
    drawContext.closePath();
    drawContext.fillStyle = this.backgroundColor;
    drawContext.fill();
  },
  drawProgressBar: function(el, data){
    var height  = el.height(),
        width   = el.width();

    var ratio  = data[0]/data[1];
    var drawContext = el[0].getContext("2d");

    // Fill the background
    drawContext.fillStyle = this.backgroundColor;
    drawContext.fillRect(0, 0, width, height);
    // Fill the bar
    drawContext.fillStyle = this.chartColor;
    drawContext.fillRect(0, 0, width * ratio, height);
  },
  drawBarChart: function(el,data){
    var height = el.height();
    var width = el.width();
    var dataSize = data.length;
    var max = _.max(data);
    var segmentWidth = width/dataSize;
    var segmentHeight = height/max;

    var drawContext = el[0].getContext("2d");

    var gdrawContext = el[0].getContext("2d");

    // Fill the background
    gdrawContext.fillStyle = this.backgroundColor;
    gdrawContext.fillRect(0,0, width, height);

    // Begin our path at the bottom left of the chart area
    drawContext.beginPath();
    drawContext.moveTo(0, height);

    // Draw the bars
    var current_x = 0;
    drawContext.fillStyle = this.chartColor;
    $.each(data, function(val){
      barYPosition = height - (data[val] * segmentHeight);
      drawContext.fillRect(current_x, barYPosition, segmentWidth, height);
      current_x += segmentWidth + 2;
    });

    drawContext.closePath();

    // Apply optional styles
    drawContext.fillStyle = this.chartColor;
    drawContext.fill();

    return this;
  }
});
