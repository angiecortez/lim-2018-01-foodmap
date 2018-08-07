// const direction = () => {
//   window.location = "index.html";
//   return
// }
// const timeout = () => {
//   window.setTimeOut("direction()", 2000)
// }
// window.onload = timeout;

window.onload=timeout;

function timeout(){
window.setTimeout("redirect()",3000)
}
function redirect(){
window.location="index.html"
return}


// let map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {
//       lat: -11.6407414,
//       lng: -76.82}
//       ,
//     zoom: 10
//   });
// }
//
// const loadJSON = (str, url, callback) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.addEventListener('load', event => {
//     if (event.target.readyState === 4 && event.target.status === 200) {
//       const response = (JSON.parse(event.target.responseText));
//       callback(str, response)
//     }
//   });
//   xhr.send();
// }
//
// loadJSON()
