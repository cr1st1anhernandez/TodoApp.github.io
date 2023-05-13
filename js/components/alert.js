export default class Alert {
  constructor(alertId){
    this.alert = document.getElementById(alertId);
  }

  show(message){
    this.alert.style.display = "flex";
    this.alert.innerText = message;
  }

  hide(){
    this.alert.style.display = "none";
  }
}
