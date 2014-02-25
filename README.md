ChartABull
==========

Very basic charts.

These are for an [OrgSync](http://www.github.com/orgsync) project so they are built with very few customization goals in my mind -- but there might be some use out there for someone else, or at least be a starting point.

[Demo](http://tylerlee.github.io/chartabull)

## How to use

Generate a canvas element with a width and height. Give it some values and specify your options.

```
  <canvas height="150" width="300"
      class="js-donut-chart"
      data-type="donut"
      data-values="[74,100]"
      data-text="Completed"></canvas>
```

Initialize your graphs as well:

```
  $('.js-donut-chart').each(function () {
    var $self = $(this);
    var data = $self.data();
    new Chartabull.Donut.draw($self, data.values, data.options, data.text);
  });

  $('.js-line-chart').each(function () { ... });
  $('.js-bar-chart').each(function  () { ... });
```

### Line Chart

#### Attributes:
- values: array of values (in order you want them to appear, the last value is the text displayed on top of the chart)
- text: the secondary text that explains the value on the chart
- line-chart-specific options:
  - backgroundColor
    - default: none

### Donut Chart

#### Attributes:
- values: array of two values [current, total] from which a percentage will be generated
- text: the secondary text that explains the value on the chart
- donut-chart-specific options:
  - secondaryColor
    - default: #dedede

### Bar Chart

#### Attributes:
- values: array of values (in order you want them to appear, the total value is the text displayed on top of the chart)

### Global options available:
  - textPadding (default: 20px)
  - primaryFont (primary font on the graph. ex: "bold 50pt helvetica")
  - secondaryFont (the secondary font on the graph. ex: "normal 20pt arial")
  - textColor (one color for both text elements)
  - chartColor (one color that represents the filled area on the chart)

