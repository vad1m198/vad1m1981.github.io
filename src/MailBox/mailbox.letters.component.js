  angular.module('mailbox') 
  .component('letters', {
    bindings: {
      mailboxId: '<'
    },
    template: `<div class="slds-p-left--xx-large">	
				<div ng-repeat="letter in $ctrl.letters">
					<div ui-sref="letter({letterId:letter._id })" class="slds-p-around--xx-small emailCard">{{letter.subject}}</div>					
				 </div>
				 <ui-view></ui-view>
				</div>`,
    controller: function($scope, MailsDataSvc) {
      MailsDataSvc.getAllMails().then(letters => {
        this.letters = letters.filter(i => i.mailbox == this.mailboxId);
      })
	  $scope.$on('deleteLetter', function(name, letterId){
		//почему через this.letters не работает? 
		$scope.$ctrl.letters = $scope.$ctrl.letters.filter( i => i._id != letterId);
	  });
    }
  })