// JAVASCRIPT:
// village_location = document.querySelector('#menu_row2 > td:nth-child(2) > b').innerText.substring(1,8);
// x = parseInt(village_location.substring(0,3));
// y = parseInt(village_location.substring(4,7));



// console.log(x,y);

// function getCord(x,y){
//     console.log(x,y);
// };


// for(let i = 1; i < 10; i++){
//     xx = x - i;
//     yy = y + i;

//     for(let j = 0; j < 2 * i; j++){
//         getCord(xx,yy);
//         xx +=1;
//     }

//     for(let j = 0; j < 2 * i; j++){
//         getCord(xx,yy);
//         yy -=1;
//     }

//     for(let j = 0; j < 2 * i; j++){
//         getCord(xx,yy);
//         xx -=1;
//     }

//     for(let j = 0; j < 2 * i; j++){
//         getCord(xx,yy);
//         yy +=1;
//     }

//     console.log("");

// }

function setColor(color){
    document.getElementById('countButton').style.background = color
    document.getElementById('findBarbars').style.background = color
    document.getElementById('config').style.background = color
    document.getElementById('stop').style.background = color
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('countButton').addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'countButtons' });

        sessionStorage.setItem('attack', 'true')
        setColor(sessionStorage.getItem('attack') == 'true'? 'red': '#40E0D0')

      });
    });

    document.getElementById('findBarbars').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'findBarbars' });
        });
      });

      document.getElementById('stop').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'stop' });
          sessionStorage.setItem('attack', 'false')
          setColor(sessionStorage.getItem('attack') == 'true'? 'red': '#40E0D0')

        });
      });

      document.getElementById('config').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'config' });
        });
      });


      setColor(sessionStorage.getItem('attack') == 'true'? 'red': '#40E0D0')

      
  });
  
  
