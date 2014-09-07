<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" ng-app="evolveApp" style="height: 100%;">
    <head>
        <meta charset="utf-8">
            <title>Evolve</title>

            <link rel="stylesheet" type="text/css" href="css/style.css" />
            <script src="js/lib/angular/angular.js"></script>
            <script src="js/lib/jquery/jquery-2.1.0.js"></script>
            <script src="js/evolvecontroller.js"></script> 
    </head>

    <body ng-controller="EvolveAppCtrl" style="height: 100%;">
        <div style="height: 70%;">
            <div style="float: left; overflow:scroll; height: 100%; width: 80%;">
                <table cellspacing="0" cellpadding="0">
                    <tr ng-repeat="someData in allData track by $index">
                        <td ng-repeat="mydata in someData track by $index">                                      
                            <img ng-if="mode=='pic'" style="width: {{zoom.px}}; height: {{zoom.px}}" ng-src="{{selected = sortByAge(mydata)[0]; selected.image}}" ng-click="setXandY($index, $parent.$index); selectActor(selected)">
                            <div ng-if="mode=='species'" style="width: {{zoom.px}}; height: {{zoom.px}}; background-color:{{selected = sortByAge(mydata)[0]; selected.speciesColour}};" ng-click="setXandY($index, $parent.$index); selectActor(selected)"/>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="float: left;  width: 20%; height: 25%;">
                <p class="cpanelhead">CONTROL PANEL</p>
                <span class="cpanelbody">ZOOM: </span><select class="cpanelbody" ng-model="zoom" ng-options="zo.name for zo in zoomOptions"></select><br/>
                <span class="cpanelbody">MODE: </span><select class="cpanelbody" ng-model="mode" ng-options="modeOption for modeOption in modeOptions"></select>
            </div>
            <br>
                <div style="float: left;  width: 20%; height: 75%;">
                    <table  class="tab">
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                        <tr ng-repeat="(key, val) in getSelected()">
                            <td>{{key}}</td>
                            <td>{{val}}</td>
                        </tr>
                    </table>
                </div>
        </div>
        <div style="height: 30%; overflow:scroll;" >
            <table class="tab">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Species</th>
                        <th>Gender</th>
                        <th>Pregnant</th>
                        <th>Pregnancy Countdown</th>
                        <th>Hunger</th>
                        <th>Thirst</th>
                        <th>Sex</th>
                        <th>Current Age</th>
                        <th>Max Age</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <select ng-model="selectedSpecies" ng-options="key as key for (key,value) in speciesSet">
                                <option value="">--species--</option>
                            </select>
                        </td>
                        <td>
                            <select ng-model="selectedGender" ng-options="key as key for (key,value) in genderSet">
                                <option value="">--gender--</option>
                            </select>
                        </td>
                        <td>
                            <select ng-model="selectedPregnancy">
                                <option value="">--pregnancy--</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr ng-repeat="actor in allActors | filter:{
                        gender:selectedGender||undefined,
                        pregnant:selectedPregnancy||undefined, 
                        species:selectedSpecies||undefined                        
                        }">  
                        <td>{{actor.uuid}}</td>                        
                        <td>{{actor.species}}</td>
                        <td>{{actor.gender}}</td>
                        <td>{{actor.pregnant}}</td>
                        <td>{{actor.pregnancyCountdown}}</td>
                        <td>{{actor.hunger}}</td>
                        <td>{{actor.thirst}}</td>
                        <td>{{actor.sex}}</td>
                        <td>{{actor.ageCurrent}}</td>
                        <td>{{actor.ageMax}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</html>