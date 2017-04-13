angular.module('app', ['ngRoute'])
.run(['$rootScope', '$location', '$http', '$timeout', function($rootScope, $location, $http, $timeout) {
	$rootScope.v = '0.0.4';
	
	$rootScope.Customers = [];
	$rootScope.isLoged = localStorage.getItem("isLoged"); //
	$rootScope.CustomerId = localStorage.getItem("CustomerId"); //
	$rootScope.CurrentAddress = '';
	
	$rootScope.setCurrentAddress = function (address) {
		$rootScope.CurrentAddress = address;
	}
	
	$http.get('data/customers.js').then(function(res){
		$rootScope.Customers = res.data;
		if($rootScope.isLoged && !$rootScope.Customer) {
			for (var k = 0; k < $rootScope.Customers.length; k++) {
				if($rootScope.CustomerId == $rootScope.Customers[k].CustomerId) {
					$rootScope.Customer = $rootScope.Customers[k];
					break;
				}
			}
		}		
	});
	 
	$rootScope.login = function (customer) {
		$rootScope.ErrorLogin = "";
		for (var i = 0; i < $rootScope.Customers.length; i++) {
			if(customer.Email.toLowerCase() == $rootScope.Customers[i].Email.toLowerCase() && customer.Password.toLowerCase() == $rootScope.Customers[i].Password.toLowerCase()) {
				$rootScope.isLoged = '1';
				$rootScope.CustomerId = $rootScope.Customers[i].CustomerId;
				
				localStorage.setItem("isLoged", $rootScope.isLoged); //
				localStorage.setItem("CustomerId", $rootScope.CustomerId); //
				$rootScope.Customer = $rootScope.Customers[i];
				
				break;
			}
		}
		if($rootScope.isLoged) {
			$location.path('/');
			$location.replace();
		}else {
			$rootScope.ErrorLogin = "The user name or password provided is incorrect.";
		}	
	}
	
	$rootScope.logout = function () {
		$rootScope.isLoged = '';
		$rootScope.userName = '';
		
		localStorage.setItem("isLoged", ''); //
		localStorage.setItem("CustomerId", ''); //
		$rootScope.Customer = null;
		
		$location.path('/');
		$location.replace();
	}
	 
 }]);

angular.module('app')
.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
   
	$locationProvider.hashPrefix('');

    $routeProvider.
      when('/', {
    	  templateUrl : 'pages/home.html',
      }).
      when('/create-new-account', {
    	  templateUrl : 'pages/create-new-account.html',
    	  controller: 'publicController'
      }).
      when('/login', {
    	  templateUrl : 'pages/login.html',
    	  controller: 'publicController'
      }).
      when('/forgot-password', {
    	  templateUrl : 'pages/forgot-password.html',
    	  controller: 'publicController'
      }).
      when('/reset-password', {
    	  templateUrl : 'pages/reset-password.html',
    	  controller: 'publicController'
      }).
      
      
      when('/step-1', {
    	  templateUrl : 'pages/step-1.html',
    	  controller: 'privateController'
      }).
      when('/step-2', {
    	  templateUrl : 'pages/step-2.html',
    	  controller: 'privateController'
      }).
      when('/step-3', {
    	  templateUrl : 'pages/step-3.html',
    	  controller: 'privateController'
      }).
      when('/step-4', {
    	  templateUrl : 'pages/step-4.html',
    	  controller: 'privateController'
      }).
      when('/special-offers-step-1', {
    	  templateUrl : 'pages/special-offers-step-1.html',
    	  controller: 'privateController'
      }).
      when('/special-offers-step-2', {
    	  templateUrl : 'pages/special-offers-step-2.html',
    	  controller: 'privateController'
      }).
      when('/special-offers-step-3', {
    	  templateUrl : 'pages/special-offers-step-3.html',
    	  controller: 'privateController'
      }).
      when('/special-offers-step-4', {
    	  templateUrl : 'pages/special-offers-step-4.html',
    	  controller: 'privateController'
      }).
      when('/profile', {
    	  templateUrl : 'pages/profile.html',
    	  controller: 'privateController'
      }).
      otherwise('/');
  }
])
.controller('publicController',['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	$scope.path = $location.path();
	if($scope.isLoged) {
		$location.path('/');
		$location.replace();
	}
	
	$scope.goResetPassword = function() {
		$location.path('/reset-password');
		$location.replace();
	}
}])
.controller('privateController',['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	$scope.path = $location.path();

	if(!$scope.isLoged) {
		$location.path('/login');
		$location.replace();
	}
}]);