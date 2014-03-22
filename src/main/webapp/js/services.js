var evolveServices = angular.module('evolveServices', []);
 
evolveServices.factory('EvolveDataService', ['$resource',
  function($resource){
    return $resource('http://localhost\\:8090/evolve', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);