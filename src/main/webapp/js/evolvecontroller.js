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
                        $scope.uuidToActor[actor.uuid] = actor;
                        if (actor.clazz == "deathclazz") {
                            actor.image = "img/ghost.jpg";
                            actor.speciesColour = "#C0C0C0"
                        } else if (actor.clazz == "seed") {
                            actor.image = "img/vine.jpg";
                            actor.speciesColour = getFromOrAddToMap(actor.species)
                        } else if (actor.clazz == "plant") {
                            if (actor.waterNeed > 40) {
                                actor.image = "img/fruit.jpg";
                            } else {
                                actor.image = "img/cactus.jpg";
                            }
                            actor.speciesColour = getFromOrAddToMap(actor.species)
                        } else if (actor.gender != null) {
                            $scope.allActors.push(actor);

                            $scope.genderSet[actor.gender] = true;
                            $scope.speciesSet[actor.species] = true;
                            actor.image = "img/komodo.jpg";
                        } else if (actor.locationType == '~') {
                            actor.image = "img/water.jpg";
                            actor.speciesColour = "#FFFFFF"
                        } else {
                            actor.image = "img/sand.jpg";
                            actor.speciesColour = '#000000'
                        }
                    }
                }
            }
        });
    }, 100);

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

    $scope.modeOptions = [
        'pic', 'species'
    ];
    $scope.mode = $scope.modeOptions[0];

}
);

speciesMap = {}
function getFromOrAddToMap(speciesNumber) {
    if (!(speciesNumber in speciesMap)) {
        var parent = speciesNumber.substring(0, speciesNumber.length - 1);
        var lastChar = speciesNumber.substring(speciesNumber.length - 1, speciesNumber.length);
        console.error("parent " + parent)
        console.error("lastChar " + lastChar)
        console.error("parent in speciesMap " + parent in speciesMap)
        console.error(lastChar === '0')
        if (parent in speciesMap && lastChar === '0') {
            speciesMap[speciesNumber] = speciesMap[parent]
        } else {
            speciesMap[speciesNumber] = getRandomColor();
        }

    }

    return speciesMap[speciesNumber];
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var colour = '#';
    for (var i = 0; i < 6; i++) {
        colour += letters[Math.round(Math.random() * 15)];
    }
    return colour;
}
