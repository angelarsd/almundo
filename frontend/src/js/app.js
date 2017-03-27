var app = angular.module('alMundo',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('list', {
        url: '/?page&sort',
        controller: 'mainController'
    });
    $urlRouterProvider.otherwise('/');
});

function mainController($scope,$http,$stateParams,$state,$location,$window){
    $scope.page = parseInt($location.$$search.page) || parseInt(1);
    function ajaxList(){
        $scope.loading = true;
        $scope.hotels = null;
        $window.scrollTo(0, 0);
        $http.get('http://127.1.1.0:3000/paginate?page='+$scope.page).then(
            function (response) {
                var data = response.data ;
                var status = response.status;
                var statusText = response.statusText;
                var headers = response.headers;
                var config = response.config;
                $scope.hotels = data.docs || 'Request failed';
                $scope.pages = data.pages;
                //console.log(data);
            }
        ).finally(function() {
            $scope.loading = false;
        });
    }
    ajaxList();
    $scope.nextPage = function() {
        if ($scope.page < $scope.pages) {
            $scope.page++;
            ajaxList();
            $state.go('.', {page: $scope.page}, {notify: false});
        }
    };
    $scope.prevPage = function() {
        if ($scope.page > 1) {
            $scope.page--;
            ajaxList();
            $state.go('.', {page: $scope.page}, {notify: false});
        }
    };
    $scope.setPage = function(p) {
        if ($scope.page!=p){
            $scope.page=p;
            ajaxList();
            $state.go('.', {page: $scope.page}, {notify: false});
        }
    }
    $scope.getNumber = function(num) {
        return new Array(num);   
    }
}

app.directive('ngTooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                $(element).tooltip('show');
            }, function(){
                $(element).tooltip('hide');
            });
        }
    };
});

app.controller('mainController', mainController);