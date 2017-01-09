import Ember from 'ember';
import layout from '../templates/components/webui-popover';

const {on, Component,computed,get,$} = Ember;
const {htmlSafe} = Ember.String;

export default Component.extend({
  actions:{
    submit(){
      if(!this.attrs.submit === undefined) return;
      let result = get(this.attrs,"submit")();
      if(result === true || result === false){
	this.hidePopover();
      }
      else{
	result.then(()=>{
	  this.hidePopover();
	},
	()=>{
	  alert("An error has occured");
	});
      }
    },
    close(){
      this.hidePopover();
      if(this.attrs.close != undefined){
	this.attrs.close();
      }
    }
  },
  layout: layout,
  placement: "auto",
  "popover-trigger": "click",
  animation: "pop",
  cache: false,
  padding: true,
  triggerText: computed("trigger-text",function(){
    return htmlSafe(get(this,"trigger-text"));
  }),
  multi: false,
  didInsertElement(){
    this.popoverTriggerElement().webuiPopover({
      animation: get(this,"animation"),
      cache: get(this,"cache"),
      url: `#${get(this,"popoverContainerId")}`,
      placement: get(this,"placement"),
      padding: get(this,"padding"),
      multi: get(this,"multi"), 
      trigger: get(this,"popover-trigger"),
      container: get(this,"container"),
    }).on("shown.webui.popover",()=>{
      $(`#${get(this,"popoverContainerId")} input:first`).focus();
    });
  },
  popoverTriggerElement(){
    let element = $(`#${get(this,"triggerId")}`);
    return element;
  },
  killPopover: on("willDestroyElement",function(){
    this.popoverTriggerElement().webuiPopover("destroy");
  }),
  hidePopover(){
    this.popoverTriggerElement().webuiPopover("hide");
  },
  popoverContainerId: computed("elementId",function(){
    return `${get(this,"elementId")}_popover_container`;
  }),
  triggerId: computed("elementId",function(){
    return `${get(this,"elementId")}_popover_trigger`;
  }),
});
