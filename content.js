chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'countButtons') {
    barbars = JSON.parse(localStorage.getItem('barbars'))

    console.log('attack')
    sessionStorage.setItem('attack', 'true')

    location.reload()


  }

  if (request.action === 'stop') {
    barbars = JSON.parse(localStorage.getItem('barbars'))

    sessionStorage.setItem('attack', 'false')
  }


  if (request.action === 'config') {
    const userInput = prompt("put you config");


    localStorage.setItem('config', userInput)
  }

  if (request.action === 'findBarbars') {
    localStorage.setItem('barbars', '')

    document.title = 'found: 0'

    village_location = document.querySelector('#menu_row2 > td:nth-child(2) > b').innerText.substring(1, 8);
    x = parseInt(village_location.substring(0, 3));
    y = parseInt(village_location.substring(4, 7));

    req_id = 1


    console.log(x, y);

    async function sleep(time) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(true)
        }, time);
      })
    }

    search = 0

    async function getCord(x, y) {
      console.log(x, y);

      search++

      url = location.href
      base = url.split('?')[0]
      village = url.split('?')[1].split('&').filter(q => q.startsWith('village'))[0]


      resp = await fetch(`${base}?${village}&screen=api&ajax=target_selection&input=${x}%7C${y}&type=coord&request_id=${req_id++}&limit=10&offset=0`, {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.8",
          "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Brave\";v=\"122\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Linux\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "tribalwars-ajax": "1",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": `${base}?${village}&screen=place`,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      });

      resp = await resp.json()

      // console.log(resp)

      if (resp.response.villages[0] && (resp.response.villages[0].name == 'Barbar K\u00f6y\u00fc' || resp.response.villages[0].name == 'Bonus köyü')) {
        str = localStorage.getItem('barbars') || "[]"
        barbars = JSON.parse(str)
        barbars.push({ x: resp.response.villages[0].x, y: resp.response.villages[0].y })
        localStorage.setItem('barbars', JSON.stringify(barbars))
        console.log(resp.response.villages[0])

      }

      if(resp.response.villages[0]){
        console.log(resp.response.villages[0].name)
      }

      s = Math.floor(Math.random() * 100) + 250
      str = localStorage.getItem('barbars') || "[]"
      barbars = JSON.parse(str)
      document.title = 'search: ' + search + ' found: ' + barbars.length

      await sleep(s)

    };


    for (let i = 1; i < 100; i++) {
      xx = x - i;
      yy = y + i;

      for (let j = 0; j < 2 * i; j++) {
        await getCord(xx, yy);
        xx += 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        await getCord(xx, yy);
        yy -= 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        await getCord(xx, yy);
        xx -= 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        await getCord(xx, yy);
        yy += 1;
      }

      console.log("");

    }
  }
});


async function attack() {



  async function sleep(time) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(true)
      }, time);
    })
  }
  s = Math.floor(Math.random() * 4000) + 1000
  await sleep(s)

  isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
  if(isBotPro && sessionStorage.getItem('attack') == 'true'){
    location.href = 'https://www.fuck.com'
  }

  if (location.href.includes('.klanlar.org/game.php') && sessionStorage.getItem('attack') == 'true') {

    console.log('attack')
    if (location.href.endsWith('confirm')) {
      const oyuncu = document.querySelector('table.vis').querySelectorAll('td')[2].innerHTML == 'Oyuncu:'
      if(oyuncu){
        location.href = location.href.substring(0, location.href.length - 12)
      }else{
          document.querySelector('#troop_confirm_submit').click()
      }
    } else {

      config = JSON.parse(localStorage.getItem('config'))
      console.log(config)
      for (let c of Object.keys(config)) {
        tot = parseInt(document.querySelector('#' + c.replace('_input', 's_entry_all')).innerText.slice(1).slice(0, -1))
        console.log(c, tot)
        if (tot < config[c]) {
          // sessionStorage.setItem('attack', 'false')
          console.log(config[c])
          await sleep(1000 * 60 * 2)
          location.reload()
        }

        if (tot > 0)
          document.querySelector("#" + c).value = config[c]
      }

      count = parseInt(localStorage.getItem("count") || "0")

      barbars = JSON.parse(localStorage.getItem('barbars'))
      barbar = barbars[count % barbars.length]

      console.log(barbar, count)
      document.querySelector('#place_target > input').value = barbar.x + '|' + barbar.y

      localStorage.setItem('count', '' + (count + 1))



      await sleep(Math.floor(Math.random() * 500) + 500)
      document.querySelector('#target_attack').click()
    }
  }
  else {
    console.log('no attack')
  }
}
attack()


console.log('klanlar')


function deleteBarbarReports(){
  if(!location.href.includes('screen=report')) return;

  isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
  if(isBotPro && sessionStorage.getItem('attack') == 'true'){
    location.href = 'https://www.fuck.com'
  }


  del_count = 0
  table = document.querySelector('#report_list')
  rows = table.querySelectorAll('tr')

  for(let i = 1; i < rows.length; i++){
      try{
      inner = table.querySelectorAll('tr')[i].querySelector('span.quickedit-label').innerText
      if(inner.includes("Bonus köyü")|| inner.includes("Barbar Köyü")){
        table.querySelectorAll('tr')[i].querySelector('input').click()
        del_count++
      }
      }catch(e){

      }
      
  }

  setTimeout(() => {
    isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
    if(isBotPro){
      location.href = 'https://www.fuck.com'
    }
    if(del_count)
    document.querySelector('#content_value > table > tbody > tr > td:nth-child(2) > form:nth-child(4) > table:nth-child(2) > tbody > tr > td:nth-child(1) > input.btn.btn-cancel').click()
    else{
      location.reload
    }
  }, 20000);
}

deleteBarbarReports()