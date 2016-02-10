'use strict';

angular.module('psWebMetricsService', []).factory('psWebMetricsService',['$rootScope', function ($rootScope) {

    var hub = $.connection.metricHub;

    hub.client.broadcastMessage = function (time, bandwidthPct, cpuPct, salesAmt, alphaSalesAmt, betaSalesAmt) {
        $rootScope.$broadcast('psWebMetricsService-received-data-event', {
            'time': time,
            'bandwidthPct': bandwidthPct,
            'cpuPct': cpuPct,
            'salesAmt': salesAmt,
            'alphaSalesAmt': alphaSalesAmt,
            'betaSalesAmt': betaSalesAmt
        });
    };

    $.connection.hub
        .start()
        .done()
        .fail(function (data) {
        alert(data);
        });


    var getTitle = function (metric) {
        switch (metric) {
            case 'cpuPct':
                return 'CPU %';
            case 'bandwidthPct':
                return 'Bandwith %';
        }
        return undefined;
    };

    return {
        getTitle : getTitle
    };

}]);