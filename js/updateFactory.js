addressBookApp.factory('UpdateContact', ['$resource', function($resource) {
  return $resource('https://fast-gorge.herokuapp.com/contacts/:id', null,
    {
      'update': { method: 'PUT' }
    });
}]);