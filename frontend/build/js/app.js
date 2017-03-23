var app = angular.module('alMundo',[]);

function mainController($scope, $http) {
    $scope.loading = true;
    $http.get('http://127.1.1.0:3000/paginate').then(function (response) {
        var data = response.data;
        var status = response.status;
        var statusText = response.statusText;
        var headers = response.headers;
        var config = response.config;
        $scope.hotels = data.docs;
        console.log(data);
    }).finally(function() {
        $scope.loading = false;
    });
}

app.directive('ngTooltip', function() {
    return function($scope, $elem) {
        $elem.tooltip({placement: 'bottom'});
    }
});


app.controller('mainController', mainController);