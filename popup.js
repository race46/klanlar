function setColor(color){
    document.getElementById('countButton').style.background = color
    document.getElementById('findBarbars').style.background = color
    document.getElementById('config').style.background = color
    document.getElementById('stop').style.background = color
    document.getElementById('assistant').style.background = color
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

      document.getElementById('pre-bot').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'startPreBot' });
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

      document.getElementById('assistant').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'assistant' });
        });
      });

      document.getElementById('timer').addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'set-timer' });
        });
      });
      setColor(sessionStorage.getItem('attack') == 'true'? 'red': '#40E0D0')

      
  });
  
  
