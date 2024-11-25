chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'countButtons') {
    barbars = JSON.parse(localStorage.getItem('barbars'))

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

  if (request.action === 'assistant') {
    const table = document.getElementById('plunder_list').querySelector('tbody')
    let i = 2
    const inter =setInterval(() => {
      try{
      const isGreen = table.children[i].querySelector('td:nth-child(2) > img').src.includes('green')
      if(isGreen) table.children[i].querySelector('td:nth-child(9) > a').click()
      
      i++
      }catch(e){
        clearInterval(inter)
      }
    }, 350);
  }

  if (request.action === 'findBarbars') {
    const dist = parseFloat(prompt('what is the max distance'))
    
    localStorage.setItem('barbars', '')
    localStorage.setItem('count', '0')


    document.title = 'found: 0'

    village_location = document.querySelector('#menu_row2 > td:nth-child(2) > b').innerText.substring(1, 8);
    x = parseInt(village_location.substring(0, 3));
    y = parseInt(village_location.substring(4, 7));

    req_id = 1

    async function sleep(time) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(true)
        }, time);
      })
    }

    search = 0
    found = 0

    async function getCord(x, y) {

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


      if (resp.response.villages[0] && (resp.response.villages[0].name == 'Barbar K\u00f6y\u00fc' || resp.response.villages[0].name == 'Bonus köyü')) {
        str = localStorage.getItem('barbars') || "[]"
        barbars = JSON.parse(str)
        barbars.push({ x: resp.response.villages[0].x, y: resp.response.villages[0].y })
        localStorage.setItem('barbars', JSON.stringify(barbars))

      }

      s = Math.floor(Math.random() * 100) + 250
      str = localStorage.getItem('barbars') || "[]"
      barbars = JSON.parse(str)
      found = barbars.length

      await sleep(s)

    };

    const all_search = []
    for (let i = 1; i < 100; i++) {
      xx = x - i;
      yy = y + i;

      for (let j = 0; j < 2 * i; j++) {
        // await getCord(xx, yy);
        distance = (x - xx) * (x - xx) + (y - yy) * (y - yy)
        all_search.push({
          x: xx,
          y: yy,
          distance: distance
        })
        xx += 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        // await getCord(xx, yy);
        distance = (x - xx) * (x - xx) + (y - yy) * (y - yy)
        all_search.push({
          x: xx,
          y: yy,
          distance: distance
        })
        yy -= 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        // await getCord(xx, yy);
        distance = (x - xx) * (x - xx) + (y - yy) * (y - yy)
        all_search.push({
          x: xx,
          y: yy,
          distance: distance
        })
        xx -= 1;
      }

      for (let j = 0; j < 2 * i; j++) {
        // await getCord(xx, yy);
        distance = (x - xx) * (x - xx) + (y - yy) * (y - yy)
        all_search.push({
          x: xx,
          y: yy,
          distance: distance
        })
        yy += 1;
      }
    }
    const filtered = all_search.filter(i => (i.distance <= dist * dist)).sort((a,b) => a.distance - b.distance)

    for(let i = 0; i < filtered.length; i++){
      await getCord(filtered[i].x, filtered[i].y)
      document.title = '🔍: ' + search + '/'+filtered.length+' ✅: ' + barbars.length
    }

    alert('search completed')
  }
});

async function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, time);
  })
}


async function handle_report(){

  const now = Date.now()
  const next_report = parseInt(localStorage.getItem("next_report") || "0")
  if(now < next_report) return

  localStorage.setItem("next_report", ""+(now + Math.floor(Math.random() * 50000) + 50000))
  const storage = JSON.parse(localStorage.getItem("report_bots") || "{}")


  url = location.href.replace("place", "report")
  const res = await fetch(url)
  const data = await res.text()

  const dom = new DOMParser()
  const doc = dom.parseFromString(data, 'text/html');

  rows = doc.getElementById('report_list').querySelectorAll('tr')

  for(let i = rows.length - 2; i > 0; i--){
    const row = rows[i]
    try{
      const text = row.querySelector('a > span').innerHTML
      const status = row.querySelectorAll('img')[1].src.includes('green')
      const regex = /\b\d{3}\|\d{3}\b/g;
      const target = "bot_" + text.match(regex)[1].replace('|', '');
      storage[target] = status
    }catch(e){

    }
  }
  localStorage.setItem("report_bots", JSON.stringify(storage))
}

function doesHaveEnoughArmy(config){
  isIt = true
  Object.keys(config).forEach(c => {
    tot = parseInt(document.querySelector('#' + c.replace('_input', 's_entry_all')).innerText.slice(1).slice(0, -1))
    if(tot < config[c]) isIt = false
  })

  return isIt
}

function fillTable(config){
  Object.keys(config).forEach(c => {
    if(config[c])
    document.querySelector("#" + c).value = config[c]
  })
}

function isFirstAttack(village){
  const reports = JSON.parse(localStorage.getItem("report_bots") || "{}")
  const key = `bot_${village.x}${village.y}`
  return reports[key] !== false
}

function getNextVillage(){
  const count = parseInt(localStorage.getItem("count") || "0")

  const barbars = JSON.parse(localStorage.getItem('barbars'))
  const village = barbars[count % barbars.length]

  return village
}

async function attackButtonClick(village){
  incrementCount()
  document.querySelector('#place_target > input').value = village.x + '|' + village.y
  await sleep(Math.floor(Math.random() * 1500) + 1500)
  document.querySelector('#target_attack').click()
}

function botProtection(){
  isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
  if(isBotPro && sessionStorage.getItem('attack') == 'true'){
    location.href = 'https://www.fuck.com'
  }
}

function incrementCount(){
  count = parseInt(localStorage.getItem("count") || "0")
  localStorage.setItem('count', '' + (count + 1))
}

async function attack() {
  await sleep(Math.floor(Math.random() * 4000) + 1000)


  botProtection()


  if (location.href.includes('.klanlar.org/game.php') && sessionStorage.getItem('attack') == 'true') {

    if (location.href.endsWith('confirm')) {
      const oyuncu = document.querySelector('table.vis').querySelectorAll('td')[2].innerHTML == 'Oyuncu:'
      if(oyuncu){
        location.href = location.href.substring(0, location.href.length - 12)
      }else{
          document.querySelector('#troop_confirm_submit').click()
      }
    } else {
      await handle_report()
      // while(isFirstAttack(getNextVillage()))incrementCount()
      config = JSON.parse(localStorage.getItem('config'))
      village = getNextVillage()
      const isFirstConfig = isFirstAttack(village)
      config = isFirstConfig ? config[0] : config[1]

      enoughArmy = doesHaveEnoughArmy(config)

      if(isFirstConfig){
        if(!enoughArmy){
          await sleep(120000)
          location.reload()
        }

      }else{
        if(!enoughArmy) {
          incrementCount()
          location.reload()
        }
      }

      fillTable(config)
      attackButtonClick(village)
    }
  }
  else {
  }
}
attack()

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

  // setTimeout(() => {
  //   isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
  //   if(isBotPro){
  //     location.href = 'https://www.fuck.com'
  //   }
  //   if(del_count)
  //   document.querySelector('#content_value > table > tbody > tr > td:nth-child(2) > form:nth-child(4) > table:nth-child(2) > tbody > tr > td:nth-child(1) > input.btn.btn-cancel').click()
  //   else{
  //     location.reload
  //   }
  // }, 20000);
}

deleteBarbarReports()