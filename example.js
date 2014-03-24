
// Create a model with 'firstName' and 'lastName'
var model = new Backbone.Model({
  firstName: 'Joe',
  lastName: 'Schmoe'
});

// Add a computed property fullName = firstName + ' ' + lastName
addComputedProperty(model,
                    // the name of the computed property
                    'fullName', 
                    // the names of dependency properties
                    ['firstName', 'lastName'],
                    // dependency property values are injected as arguments
                    // to this function that computes the computed property
                    function (firstName, lastName){

  // return the value for 'fullName'
  return firstName + ' ' + lastName;
});

// The below code tests the computed property.

// Listen for changes and print out the new values.
function monitor(property){
  model.on('change:' + property, function(){
    console.log('new ' + property + ' = ' + model.get(property));
  });
}

// Monitor all properties for testing.
monitor('firstName');
monitor('lastName');
monitor('fullName');

console.log('Testing only changing firstName:');
model.set('firstName', 'Jim');
// Prints the following:
// Testing only changing firstName:
// new firstName = Jim
// new fullName = Jim Schmoe 

console.log('Testing only changing lastName:');
model.set('lastName', 'Dandy');
// Prints the following:
// Testing only changing lastName:
// new lastName = Dandy
// new fullName = Jim Dandy 

console.log('Testing changing firstName and lastName:');
model.set('firstName', 'Jane');
model.set('lastName', 'Doe');

// Prints the following:
// Testing changing firstName and lastName:
// new firstName = Jane
// new lastName = Doe
// new fullName = Jane Doe

// Notice how fullName is only set once
// when both properties change, not twice.
