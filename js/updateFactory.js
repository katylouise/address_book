addressBookApp.factory('UpdateContact', ['$resource', function($resource) {
  return $resource('/contacts/:id', null,
    {
      'update': { method:'PUT' }
    });
}]);