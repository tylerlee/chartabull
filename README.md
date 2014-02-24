ChartABull
==========

Very basic charts. Very much a work in progress. If you're seeing this I shared it with you because I trust you won't judge the code yet.

These are for an [OrgSync](http://www.github.com/orgsync) project so they are built with very few customization goals in my mind -- but there might be some use out there for someone else, or at least be a starting point.

## How to use

Generate a canvas element with a width and height. Give it some values and specify your options.

```
<canvas height="250" width="500" class="js-chartabull"
    data-values   = "[25,15,25,3,35]"
    data-options  = '{"backgroundColor": "#E97F02", "chartColor": "#F8CA00", "textColor": "#490A3D"}'
    data-text     = "% Retention Rate"
    data-type     = "line">
```

Initialize your graphs as well:

```
  $('.js-chartabull').each(function () {
    var $self = $(this);
    var data = $self.data();
    new Chartabull($self, data.type, data.values, data.options, data.text);
  });
```

### Line Chart

#### Attributes:
- type: line
- values: array of values (in order you want them to appear, the last value is the text displayed on top of the chart)
- text: the secondary text that explains the value on the chart
- line-chart-specific options:
  - backgroundColor
    - default: none

### Donut Chart

#### Attributes:
- type: donut
- values: array of two values [current, total] from which a percentage will be generated
- text: the secondary text that explains the value on the chart
- donut-chart-specific options:
  - secondaryColor
    - default: #dedede

### Progress Bar

#### Attributes:
- type: progress
- values: array of two values [current, total] from which a percentage will be generated

### Global options available:
  - textPadding (default: 20px)
  - primaryFont (primary font on the graph. ex: "bold 50pt helvetica")
  - secondaryFont (the secondary font on the graph. ex: "normal 20pt arial")
  - textColor (one color for both text elements)
  - chartColor (one color that represents the filled area on the chart)

