<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" ng-app="evolveApp">
    <head>
        <meta charset="utf-8">
            <title>Evolve</title>
            <script src="js/lib/angular/angular.js"></script>
            <script src="js/lib/jquery/jquery-2.1.0.js"></script>

            <script src="js/evolvecontroller.js"></script> 
    </head>

    <body ng-controller="EvolveAppCtrl">
        <div>
            <table cellspacing="0" cellpadding="0">
                <tr ng-repeat="someData in allData track by $index">
                    <td ng-repeat="mydata in someData track by $index">                                      
                        <img ng-src="{{selected = sortByAge(mydata)[0]; selected.image}}" ng-click="setXandY($index, $parent.$index); selectActor(selected)">
                    </td>
                </tr>
            </table>
        </div>
        <div>
            DIV
            Animal = {{getSelected()}}
        </div>
    </body>
</html>