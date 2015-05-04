'use strict';

// Customers controller
var customersApp = angular.module('customers');

customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log',
	
	function($scope, $stateParams, Authentication, Customers, $modal, $log) {
		this.authentication = Authentication;

		//find a list of customers
		this.customers = Customers.query();

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
						$modalInstance.dismiss('cancel');

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
	}

]);

customersApp.directive('customerList', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/customers/views/customer-list-template.html',
		link: function(scope, element, attr) {
		}
	};

});

customersApp.controller('CustomersCreateController', ['$scope', 'Authentication', 'Customers', '$location','$modal', '$log',
	
	function($scope, Customers, $modal, $log) {

		this.create = function() {
			
			alert('Create Customers');

			// Create new Customer object
			this.customer = function() {
				
				this.customer = new Customers ({
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

			// Redirect after save
			this.customer.$save(function(response) {
				//$location.path('customers/' + response._id);

				alert('saving');

				// Clear form fields
				$scope.lastName = '';
				$scope.suburb = '';
				$scope.country = '';
				$scope.industry = '';
				$scope.email = '';
				$scope.phone = '';
				$scope.referred = '';
				$scope.channel = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			};

		};
		
	}

]);

customersApp.controller('CustomersUpdateController', ['$scope', '$location', 'Customers',
	function($scope, Customers) {

		// Update existing Customer
		this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			customer.$update(function() {
				//$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}

]);
