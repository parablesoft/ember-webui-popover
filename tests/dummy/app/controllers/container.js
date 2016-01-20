import Ember from "ember";

const {Controller,set} = Ember;

export default Controller.extend({
	someValue: null,
	actions:{
	  createSomething(){
			return new Ember.RSVP.Promise((resolve,reject) =>{
				set(this,"someValue","");
				set(this,"someOtherValue","");
				resolve();
			});
	  },
		close(){
			return true;
		}
	}
});
