'use strict';


angular.module('backAnd.controllers')
    .controller('menuController', ['$scope', 'Global', 'menuService', '$timeout', '$rootScope', '$http', '$location', '$route',
        function($scope, Global, menuService, $timeout, $rootScope, $http, $location, $route) {

            $scope.global = Global;
            $scope.init = function() {
                if (!localStorage.getItem('Authorization')) {
                    $location.path('/login');

                } else {
                    $location.path('/');
                    $http.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                    menuService.queryjsonp({},
                        function success(data) {
                            $scope.pages = data.workspace.pages;

                            $timeout(function() {
                                adminLteInit();
                            });
                        },
                        function err(error) {
                            if (error.status == 401) {
                                localStorage.removeItem("Authorization");
                                window.location.reload();
                            }
                        });
                }
            }
            $scope.setCurrentTable = function(table, index) {
                $scope.curTable = index;
                $scope.global.currentTable = table;
                //$rootScope.$broadcast('loadData');
            }
            $scope.$on('load', function() {
                $scope.init();
            });

        }
    ])
