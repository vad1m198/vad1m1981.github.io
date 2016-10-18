angular.module('mailbox') 
.component("createLetter",{ 
	controller : function(MailsDataSvc) {		
		MailsDataSvc.getAllMailboxes()
        .then(mailboxes => {
          this.sentMailbox = mailboxes.find(i => i.title.toUpperCase() == 'SENT')
        })
		this.to = "";
		this.subject = "";
		this.body = "";
		this.saving = false;
		this.sendEmail = function() {
			this.saving = true;
			MailsDataSvc.saveLetter({ subject: this.subject, to: this.to, body: this.body, mailbox: this.sentMailbox._id})
						.then( () => {
								this.to = "";
								this.subject = "";
								this.body = "";
								this.addMailForm.$setPristine();
								this.addMailForm.$setUntouched();
								this.saving = false;
							})
		}
		
	},	
	template: `<form name="$ctrl.addMailForm" ng-submit="$ctrl.sendEmail()">
				<div class="slds-form--stacked">
				  <div class="slds-form-element">
					<label class="slds-form-element__label" for="mail">
					<abbr class="slds-required" title="required">*</abbr> To</label>
					<div class="slds-form-element__control">
					  <input ng-required="true" id="mail" class="slds-input" type="email" ng-model="$ctrl.to"/>
					</div>
				  </div>
				  <div class="slds-form-element">
					<label class="slds-form-element__label" for="mail-subject">
					<abbr class="slds-required" title="required">*</abbr> Subject</label>
					<div class="slds-form-element__control">
					  <input ng-required="true" id="mail-subject" class="slds-input" ng-model="$ctrl.subject"/>
					</div>
				  </div>
				  <div class="slds-form-element">
				  <label class="slds-form-element__label" for="body">Body</label>
				  <div class="slds-form-element__control">
					<textarea id="body" class="slds-textarea"rows="10" ng-model="$ctrl.body"></textarea>
				  </div>
				</div>
					<button type="submit" class="slds-button slds-button--brand slds-m-top--x-small slds-float--right" ng-disabled="$ctrl.saving">Send</button>		  
				</div>	
			</form>`,   
  })