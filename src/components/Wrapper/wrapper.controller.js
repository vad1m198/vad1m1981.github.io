class WrapperController {
	constructor($scope, $state) {
		this.$scope = $scope;		
		this.$state = $state;
		this.loading = false;
		this.error = '';
		this.notification = '';
		
	    this.$scope.$on('startLoading', ()=>{
			this.$scope.$ctrl.loading = true;
	    });
		this.$scope.$on('stopLoading', ()=>{
			this.$scope.$ctrl.loading = false;
		});
		this.$scope.$on('showError', (name, errorMessage)=>{		
			this.$scope.$ctrl.error = errorMessage;
		});
		this.$scope.$on('showNotification', (name, message)=>{		
			this.$scope.$ctrl.notification = message;
		});
		
		this.$scope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {					
			this.authError = error;
			$state.go('login');
		});
		
		this.$scope.$on('$stateChangeSuccess',  (event, toState, toParams, fromState, fromParams, error) => {								
		    //will hide error when any state was changed successfully
			this.authError = "";
		})
	}
	
	hideError() {
		this.error = '';
	}
	hideNotification() {
		this.notification = '';
	}
}
WrapperController.$inject = ['$scope', '$state'];
export default WrapperController;