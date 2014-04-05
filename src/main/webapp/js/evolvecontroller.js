var evolveApp = angular.module('evolveApp', []);

evolveApp.controller('EvolveAppCtrl', function($scope, $http) {
    setInterval(function() {
        $http.get('http://localhost\:8090/evolve').
                success(function(data) {

            $scope.allData = data.data;
            $scope.uuidToActor = {};

            for (aOne in $scope.allData) {
                for (aTwo in $scope.allData[aOne]) {
                    for (aThree in $scope.allData[aOne][aTwo]) {
                        actor = $scope.allData[aOne][aTwo][aThree]
                        $scope.uuidToActor[actor.uuid] = actor;

                        if (actor.gender != null) {
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
    }, 500);

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
}
);
