(function () {
  'use strict';
  // Store a local reference to jQuery and Underscore.
  var $ = window.jQuery;
  var _ = window._;

  var chart = function(){
    alert('hello');
  }
  var Chartabull = window.Chartabull = function(el, data){
    _.extend(this, data);
    this.buildContainer();
  }

  _.extend(Chartabull.prototype, {
    buildContainer: function () {
      return this;
    }
  });
});
