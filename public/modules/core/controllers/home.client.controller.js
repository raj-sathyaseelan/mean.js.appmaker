'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [
			{
				icon: 'glyphicon-user',
				color: 'btn-success',
				total: '20,458',
				description: 'TOTAL CUSTOMERS'
			},
			{
				icon: 'glyphicon-glass',
				color: 'btn-success',
				total: '3,458',
				description: 'UPCOMING EVENTS'
			},
			{
				icon: 'glyphicon-music',
				color: 'btn-info',
				total: '208',
				description: 'NEW CUSTOMERS'
			},
			{
				icon: 'glyphicon-edit',
				color: 'btn-danger',
				total: '200,458',
				description: 'EMAILS SENT'
			},
			{
				icon: 'glyphicon-upload',
				color: 'btn-warning',
				total: '20',
				description: 'REFERRALS'
			},
			{
				icon: 'glyphicon-share',
				color: 'btn-warning',
				total: '2,458',
				description: 'FOLLOW-UP'
			}
		];
	}
]);