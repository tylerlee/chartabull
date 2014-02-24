
  'use strict';
  // Store a local reference to jQuery and Underscore.
  var $ = window.jQuery;
  var _ = window._;

  var Chartabull = window.Chartabull = function(el, type, data, options, chartText){
    _.extend(this, options);
    if(type == 'line'){
      this.drawLineChart(el, data);
      // The text displayed is the last value in the set
      var chartValue = data[_.size(data)-1];
      this.buildText(el, chartValue, chartText);
    } else if(type == 'pie'){
      this.drawPieChart(el, data);
      // The text displayed is a percentage
      // round it just a wee bit
      var chartValue = Math.round((data[0]/data[1] * 100)*10)/10;
      this.buildText(el, chartValue + '%', chartText);
    } else if(type == 'progress'){
      this.drawProgressBar(el, data);
    }
  }

  _.extend(Chartabull.prototype, {

    // Font Stylings used in text laid on top
    textColor: '#777;',
    textPadding: 20,
    secondaryFont: "normal 24px 'helvetica neue', arial, verdana, sans-serif",
    primaryFont: "bold 50px 'helvetica neue', arial, verdana, sans-serif",

    // Background of Chart
    backgroundColor:  "#ffffff",
    secondaryColor:   "#dedede",
    chartColor: "#cccccc",

    // Drop some text on the graph
    buildText: function(el, chartValue, chartText){
      var height  = el.height(),
          width   = el.width();

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
          dataSize = _.size(data),
          max = _.max(data),
          min = _.min(data),
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
          midX = width/2,
          midY = height/2,
          dataSize = _.size(data);

      var sum = _.reduce(data, function(memo, num){ return memo + num; }, 0);
      var drawContext = el[0].getContext("2d");


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
    }
  });
