var evolveApp = angular.module('evolveApp', []);

evolveApp.controller('EvolveAppCtrl', function($scope, $http) {
    setInterval(function() {
        $http.get('http://localhost\:8090/evolve').
                success(function(data) {

            var dArray = new Array(data.maxX);

            for (var x = 0; x < data.maxX; x++) {
                dArray[x] = new Array(data.maxY);
                for (var y = 0; y < data.maxY; y++) {
                    var locationType = null;
                    var gender = null;
                    for (var z = 0; z < data.data[x][y].length; z++) {
                        var innerLocType = data.data[x][y][z].locationType;
                        var innerGenderType = data.data[x][y][z].gender;
                        if (innerLocType != null) {
                            locationType = innerLocType;
                        }
                        if (innerGenderType != null) {
                            gender = innerGenderType;
                        }
                    }
                    if (gender !== null) {
                        dArray[x][y] = "img/komodo.jpg";
                    } else if (locationType === '~') {
                        dArray[x][y] = "img/water.jpg";
                    } else if (locationType === '*') {
                        dArray[x][y] = "img/fruit.jpg";
                    } else {
                        dArray[x][y] = "img/sand.jpg";
                    }
                }
            }


            $scope.allData = dArray;

        });
    }, 500);
}
);
