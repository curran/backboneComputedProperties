// An implementation of computed properties for Backbone.js models.
//
// Inspired by computed properties in Ember.js
// and dependency injection Angular.js.
//
// By Curran Kelleher 3/23/2014


// Adds a computed property to a Backbone model.
//
// Args:
//  * model - the model to add the computed property to
//  * computedProperty - the name of the computed property
//  * dependencies - an array of dependency property names
//  * fn - the function that computes the computed property. Called with the current values of dependency properties as arguments (in the same order as 'dependencies').
function addComputedProperty(model, computedProperty, dependencies, fn){
  
  // Use _.debounce to collapse multiple changes of dependency properties
  // into a single call to the function that computes the computed property.
  var callFn = _.debounce(function(){
    
    // Compute the arguments to pass into the function that 
    // that computes the computed property; the current values
    // for each of the dependency properties from the model.
    var args = dependencies.map(function (property){
      return model.get(property);
    });
    
    // Set the value of the computed property by calling the
    // function that computes it, passing in the current values
    // of dependency properties from the model.
    model.set(computedProperty, fn.apply(null, args));
  });
  
  // Listen for changes on each of the dependency properties.
  dependencies.forEach(function(property){
    
    // Since callFn is debounced, multiple sequential calls
    // will collapse into a single call on the next tick of the event loop.
    model.on('change:' + property, callFn);
  });
}
