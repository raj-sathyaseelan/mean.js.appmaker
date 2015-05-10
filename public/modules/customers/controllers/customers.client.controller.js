'use strict';

// Customers controller
var customersApp = angular.module('customers');
var	channelOptions = [
			'Facebook',
			'Twitter',
			'LinkedIn',
			'Google'
		];

customersApp.value('channelOptions', channelOptions);

customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log',
	
	function($scope, $stateParams, Authentication, Customers, $modal, $log) {
		this.authentication = Authentication;

		//find a list of customers
		this.customers = Customers.query();

		$scope.channelOptions = channelOptions;

		//open a modal window to create a single customer record
		this.modalCreate = function (size) {

			var modalInstance = $modal.open({
				templateUrl: 'modules/customers/views/create-customer.client.view.html',
				controller: function ($scope, $modalInstance) { 

					$scope.ok = function (validForm) {

						if (validForm){
							$modalInstance.close();	
						} else {
							alert('hi');
						}

					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');

					//clear all updates made
					//@TODO: 
					};
				},
				size: size
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});

		};

		//open a modal window to update a single customer record
		this.modalUpdate = function (size, selectedCustomer) {


			var modalInstance = $modal.open({
				templateUrl: 'modules/customers/views/edit-customer.client.view.html',
				controller: function ($scope, $modalInstance, customer) { 
					$scope.customer = customer;

					$scope.ok = function (validForm) {

						if (validForm){
							$modalInstance.close(customer);	
						} 

					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel'
							);

					//clear all updates made
				};
			},
			size: size,
			resolve: {
				customer: function () {
					return selectedCustomer;
				}

			}
		});

		modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
		
		};

		//Remove existing customer
		this.remove = function( customer ) {

			if ( customer ) {
				customer.$remove();

				for ( var i in this.customers ) {
					if ( this.customers[i] === customer ){
						this.customers.splice(i,1);
					}
				}
			} else {
				this.customer.$remove(function() {
				});
			}

		};
		
	}

]);

customersApp.directive('customerList', ['Customers', 'Notify', function(Customers, Notify) {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/customers/views/customer-list-template.html',
		link: function(scope, element, attr) {

			//when a new customer is added, update the customer list
			Notify.getMsg('NewCustomer', function(event, data) {
				//display a list of customers
				scope.customersCtrl.customers = Customers.query();
			});
		}
	};

}]);


// Customers Create controller
customersApp.controller('CustomersCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers','Notify',
	
	function($scope, $stateParams, $location, Authentication, Customers, Notify ) {
		
		$scope.authentication = Authentication;

		// $scope.channelOptions = [
		// 	{id: 1, item: 'Facebook'},
		// 	{id: 2, item: 'Twitter'},
		// 	{id: 3, item: 'LinkedIn'},
		// 	{id: 4, item: 'Google'}
		// ];

		$scope.channelOptions = channelOptions;

		// Create new Customer
		this.createCustomer = function() {
			
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
				lastName: this.lastName,
				suburb: this.suburb,
				country: this.country,
				industry: this.industry,
				email: this.email,
				phone: this.phone,
				referred: this.referred,
				channel: this.channel
			});

			alert(customer.channel);

			// Redirect after save
			customer.$save(function(response) {
				//$location.path('customers/' + response._id);
				//$location.path('customers/');				

				// Clear form fields
				// this.firstName = '';
				// this.surname = '';
				// this.suburb = '';
				// this.country = '';
				// this.industry = '';
				// this.email = '';
				// this.phone = '';
				// this.referred = '';
				// this.channel = '';

				Notify.sendMsg('NewCustomer', {'id': response._id});

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

customersApp.controller('CustomersUpdateController', ['$scope', '$location', 'Customers',
	
	function($scope, Customers) {

		$scope.channelOptions = channelOptions;

		// Update existing Customer
		this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			//customer.channel = updatedCustomer.channel.item;

			//alert(customer.channel);
			//alert(updatedCustomer.firstName);

			customer.$update(function() {
				//$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}

]);
