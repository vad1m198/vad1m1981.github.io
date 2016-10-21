angular.module('mailbox')
.service('MailsDataSvc', function($http, $interval) {
	let mails;
	let mailboxes;
  this.getAllMails = () => {
	  if(!mails) {		
		mails = $http.get('http://test-api.javascript.ru/v1/vmerkotan/letters?delay=1000')
                  .then(response => response.data);
	  }
      return mails;
    }
  this.getAllMailboxes = () => {
	  if(!mailboxes) {
		mailboxes = $http.get('http://test-api.javascript.ru/v1/vmerkotan/mailboxes?delay=1000')
						.then(response => response.data)
	  }
      return mailboxes;
    }
   this.deleteMail = letterId => {
	return $http.delete('http://test-api.javascript.ru/v1/vmerkotan/letters/' + letterId + '?delay=1000');	
   }
   
   this.moveToTrash = (letterId, letter) => {
	 mails = null;
	return $http.patch('http://test-api.javascript.ru/v1/vmerkotan/letters/' + letterId + '?delay=1000', letter);	
   }
   
   this.saveLetter = (mail) => {
		mails = null;
		return $http.post('http://test-api.javascript.ru/v1/vmerkotan/letters/?delay=1000', mail);
	}
})
