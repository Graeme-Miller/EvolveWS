var evolveApp = angular.module('evolveApp', []);

evolveApp.controller('EvolveAppCtrl', function($scope, $http) {
    setInterval(function() {
        $http.get('http://localhost\:8090/evolve').
                success(function(data) {

            $scope.allData = data.data;
            $scope.uuidToActor = {};
            $scope.allActors = [];
            $scope.genderSet = {};
            $scope.speciesSet = {};


            for (aOne in $scope.allData) {
                for (aTwo in $scope.allData[aOne]) {
                    for (aThree in $scope.allData[aOne][aTwo]) {
                        actor = $scope.allData[aOne][aTwo][aThree]
                                     
                        if (actor.species == "seed") {
                            $scope.uuidToActor[actor.uuid] = actor;
                            actor.image = "img/vine.jpg";
                        }else if (actor.species == "plant") {
                            $scope.uuidToActor[actor.uuid] = actor;
                    //        if(actor.gender == 'M') {
                                actor.image = "img/fruit.jpg";
                     //       } else {
                     //           actor.image = "img/lillies.jpg";
                     //       }
                        } else if (actor.gender != null) {
                            $scope.uuidToActor[actor.uuid] = actor;
                            $scope.allActors.push(actor);

                            $scope.genderSet[actor.gender] = true;
                            $scope.speciesSet[actor.species] = true;
                            actor.image = "img/komodo.jpg";
                        } else if (actor.locationType == '~') {
                            actor.image = "img/water.jpg";
                        } else if (actor.locationType == '*') {
                            actor.image = "img/fruit.jpg";
                        } else {
                            actor.image = "img/sand.jpg";
                        }
                    }
                }
            }
        });
    }, 1000);

    $scope.sortByAge = function(actorList) {
        var newList = actorList.sort(function(x, y) {
            var xAge = x.ageCurrent;
            var yAge = y.ageCurrent;

            if (xAge === undefined && yAge === undefined) {
                return 0;
            } else if (xAge === undefined) {
                return 1;
            } else if (yAge === undefined) {
                return  -1;
            } else {
                return yAge - xAge;
            }

        });
        return newList;
    };

    $scope.setXandY = function(x, y) {
        $scope.x = x;
        $scope.y = y;
    };

    $scope.selectActor = function(actor) {
        $scope.uuidOfSelcted = actor.uuid;
    };
    $scope.getSelected = function() {
        if ($scope.uuidOfSelcted === undefined) {
            return;
        } else {
            return $scope.uuidToActor[$scope.uuidOfSelcted];
        }
    };

//Zoom Setup
    $scope.zoomOptions = [
        {name: '25%', px: '15px'},
        {name: '50%', px: '21.21px'},
        {name: '75%', px: '25.98px'},
        {name: '100%', px: '30px'},
        {name: '125%', px: '33.54px'},
        {name: '150%', px: '36.74px'}
    ];
    $scope.zoom = $scope.zoomOptions[0];

}
);
