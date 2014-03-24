backboneComputedProperty
========================

An small and simple implementation of computed properties for Backbone.js

Inspired by computed properties in Ember.js
and dependency injection Angular.js.

Prior Art:

 * [Backbone mailing list thread: Backbone.Model Computed Attributes](https://groups.google.com/forum/#!searchin/backbonejs/computed$20property/backbonejs/B21PIFVRvoA/wjG6ZbDqfccJ)
 * [Blog post: Backbone.js computed properties](http://kilon.org/blog/2012/02/backbone-calculated-fields/)
 * [GitHub: kdocki / backbone.model.computed](https://github.com/kdocki/backbone.model.computed)
 * [GitHub: phdesign / Backbone.Spark](https://github.com/phdesign/Backbone.Spark)
 * [GitHub Gist: tjbladez / computed.coffee](https://gist.github.com/tjbladez/2637522)

By Curran Kelleher 3/23/2014

Here's the implementation:

```javascript

function addComputedProperty(model, computedProperty, dependencies, fn){
  var callFn = _.debounce(function(){
    var args = dependencies.map(function (property){
      return model.get(property);
    });
    model.set(computedProperty, fn.apply(null, args));
  });
  dependencies.forEach(function(property){
    model.on('change:' + property, callFn);
  });
}

// Example usage:
var model = new Backbone.Model({
  firstName: "Joe",
  lastName: "Schmoe"
});

addComputedProperty(model, 'fullName', 
                    ['firstName', 'lastName'],
                    function (firstName, lastName){
  return firstName + ' ' + lastName;
});
```

See `addComputedProperty.js` for a documented implementation, and `example.js` for a documented and more complete example.
