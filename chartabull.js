(function () {
  'use strict';

  // Store a local reference to jQuery and Underscore.
  var $ = window.jQuery;
  var _ = window._;

  var Chartabull = window.Chartabull = {};

  var Base = Chartabull.Base = {
    defaults: {
      "textColor": '#777;',           // Overlay text color
      "textPadding": 20,              // Offset from corner for text
      "secondaryFont": "normal 24px 'helvetica neue', arial, verdana, sans-serif",
      "primaryFont": "bold 50px 'helvetica neue', arial, verdana, sans-serif",
      "backgroundColor":  "#ffffff",  // Background of Chart
      "secondaryColor":   "#dedede",  // Certain charts use a secondary color
      "chartColor": "#cccccc"         // Primary color of a chart element
    },
    draw: function () {},
    getContext: function ($el) { return $el[0].getContext("2d"); },
    // Drop some text on the graph
    buildText: function ($el, chartValue, chartText, options) {
      var height  = $el.height();

      var context = Base.getContext($el);

      context.fillStyle = options.textColor;
      context.font = options.primaryFont;
      context.fillText(chartValue, options.textPadding, height - 50);
      context.font = options.secondaryFont;
      context.fillText(chartText, options.textPadding, height - options.textPadding);

      return this;
    }
  };

  Chartabull.Line = herit(Base, {
    draw: function (el, data, options, text) {
      var height = el.height();
      var width = el.width();
      var dataSize = data.length;
      var max = _.max(data);
      var segmentWidth = width / (dataSize - 1);
      var segmentHeight = height / max;
      var drawContext = Base.getContext(el);

      options = _.defaults(options || {}, Base.defaults);

      // Fill the background
      drawContext.fillStyle = options.backgroundColor;
      drawContext.fillRect(0, 0, width, height);

      // Begin our path at the bottom left of the chart area
      drawContext.beginPath();
      drawContext.moveTo(0, height);

      // Draw the lines
      $.each(data, function (val) {
        var current_x = val * segmentWidth;
        var current_y = height - data[val] * segmentHeight;
        drawContext.lineTo(current_x, current_y);
      });

      // Close out the graph (connect to bottom right)
      drawContext.lineTo(width, height);
      drawContext.closePath();

      // Apply optional styles
      drawContext.fillStyle = options.chartColor;
      drawContext.fill();

      if (text) Base.buildText(el, data[data.length - 1], text, options);

      return this;
    }
  });

  Chartabull.Donut = herit(Base, {
    draw: function (el, data, options, text) {
      var height = el.height();
      var width = el.width();
      var drawContext = Base.getContext(el);
      var x = width / 2;
      var y = height / 2;
      var r = _.min([width,height])/2;
      var percentage = Math.round((data[0]/data[1] * 100)*10)/10;

      options = _.defaults(options || {}, Base.defaults);

      // Fill the background
      drawContext.fillStyle = options.secondaryColor;
      drawContext.arc(x, y, r, 0, (Math.PI * 2), false);
      drawContext.fill();

      // Draw the arc
      drawContext.beginPath();
      drawContext.arc(x, y, r, 0, (Math.PI * 2) * (data[0]/data[1]), false);
      drawContext.lineTo(x,y);
      drawContext.closePath();
      drawContext.fillStyle = options.chartColor;
      drawContext.fill();

      // Cut out the internal arc by dropping a filled circle on top
      // that is the background color
      drawContext.beginPath();
      drawContext.arc(x, y, r/2, 0, (Math.PI * 2), false);
      drawContext.closePath();
      drawContext.fillStyle = options.backgroundColor;
      drawContext.fill();

      if (text) Base.buildText(el, percentage + '%', text, options);

      return this;
    }
  });

  Chartabull.Bar = herit(Base, {
    draw: function (el, data, options, text) {
      var height = el.height();
      var width = el.width();
      var dataSize = data.length;
      var max = _.max(data);
      var segmentWidth = width / dataSize;
      var segmentHeight = height / max;
      var drawContext = Base.getContext(el);
      var gdrawContext = Base.getContext(el);
      var current_x = 0;
      var total =  _.reduce(data, function (a, b) { return a + b; }, 0);

      options = _.defaults(options || {}, Base.defaults);

      // Fill the background
      gdrawContext.fillStyle = options.backgroundColor;
      gdrawContext.fillRect(0, 0, width, height);

      // Begin our path at the bottom left of the chart area
      drawContext.beginPath();
      drawContext.moveTo(0, height);

      // Draw the bars
      drawContext.fillStyle = options.chartColor;
      $.each(data, function (val) {
        var barYPosition = height - data[val] * segmentHeight;
        drawContext.fillRect(current_x, barYPosition, segmentWidth, height);
        current_x += segmentWidth + 2;
      });

      drawContext.closePath();

      // Apply optional styles
      drawContext.fillStyle = options.chartColor;
      drawContext.fill();

      if (text) Base.buildText(el, total, text, options);

      return this;
    }
  });
})();
