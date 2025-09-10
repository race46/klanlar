chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'countButtons') {
    barbars = JSON.parse(localStorage.getItem('barbars'))

    sessionStorage.setItem('attack', 'true')
    location.reload()
  }

  if (request.action === 'startPreBot') {
    startPreBot()
  }

  if (request.action === 'stop') {
    barbars = JSON.parse(localStorage.getItem('barbars'))

    sessionStorage.setItem('attack', 'false')
  }

  if(request.action === 'set-timer'){
    const time = prompt('time as HH:MM:SS:sss?')
    const t = time.substring(0, 8)
    const latency = time.split(':')[3]
    document.querySelector('#command-data-form > h2').innerHTML = time + ' attack'
    const inter = setInterval(() => {
      x = document.querySelector('#date_arrival > span').innerHTML.trim().split(' ')
      x = x[x.length - 1]
      if(x === t){
        clearInterval(inter);
        setTimeout(() => {
          document.querySelector('#troop_confirm_submit').click()
        }, parseInt(latency));
      }
    }, 1);
  }

  if (request.action === 'config') {
    const userInput = prompt("put you config");


    localStorage.setItem('config', userInput)
  }

  if (request.action === 'assistant') {
    const inter = prompt('loot assistant attack interval in minute')
    localStorage.setItem('attack_interval', inter)
    location.reload()
  }

  if (request.action === 'findBarbars') {
    const dist = parseFloat(prompt('what is the max distance'))
    
    localStorage.setItem('barbars', '')
    localStorage.setItem('count', '0')


    document.title = 'found: 0'

    village_location = (document.querySelector('#menu_row2 > td:nth-child(2) > b') ?? document.querySelector('#menu_row2 > td:nth-child(4) > b')).innerText.substring(1, 8);
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


const script = document.createElement("script");
script.src = chrome.runtime.getURL("./injo.js");
(document.head || document.documentElement).appendChild(script);

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "FROM_PAGE") {
    // console.log("Got data from page:", event.data.value);
  }
});


const recoverAll = () =>  window.postMessage({ type: "FROM_PAGE", value: 'hey bitch' }, "*");


const set = async (key, value) => {
  return new Promise((res, rej) => {
    chrome.storage.local.set({ [key]: value
    }, function () {
      res(true)
    });
  })
}

const get = async (key) => {
  return new Promise((res, rej) => {
    chrome.storage.local.get([key], function (result) {
      res(result[key])
    }
    );
  })
}

const remove = async (key) => {
  return new Promise((res, rej) => {
    chrome.storage.local.remove([key], function () {
      res(true)
    }
    );
  })
}

async function sleep(time) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, time);
  })
}


async function handle_report(){
  return
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
  ba = JSON.parse(localStorage.getItem('barbars'))
  Object.keys(storage).forEach((r)=> {
    b = ba.find(b => `bot_${b.x}${b.y}` === r)
    if(!b || storage[r]) delete storage[r]
})
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
  try{
    const count = parseInt(localStorage.getItem("count") || "0")

    const barbars = JSON.parse(localStorage.getItem('barbars'))
    const village = barbars[count % barbars.length]
  
    return village
  }catch(e){
    return {x:0, y:0}
  }
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
    sendTelegramMessage().then(() => location.href = 'https://www.fuck.com')
  }
}

function incrementCount(){
  count = parseInt(localStorage.getItem("count") || "0")
  localStorage.setItem('count', '' + (count + 1))
}

const attack_interval = parseInt(localStorage.getItem('attack_interval'))
const get_first_loot_config = () => [...document.querySelectorAll('#content_value > div:nth-child(3) > div > form > table > tbody > tr:nth-child(2) > td')].map(td => parseInt(td.querySelector('input') ? td.querySelector('input').value : '0'))
const get_second_loot_config = () => [...document.querySelectorAll('#content_value > div:nth-child(3) > div > form > table > tbody > tr:nth-child(4) > td')].map(td => parseInt(td.querySelector('input') ? td.querySelector('input').value : '0'))
const get_village_army = () => [...document.querySelectorAll('#farm_units > table > tbody > tr:nth-child(2) > td')].map(td => parseInt(td.innerText)).slice(1)
const get_pages = () => [...document.querySelector('#plunder_list_nav > table > tbody > tr > td').children].filter(el => el.tagName != 'SELECT')
const get_current_page = () => [...document.querySelector('#plunder_list_nav > table > tbody > tr > td').children].map(r => r.innerText).findIndex(a => a.startsWith('>'))
const is_last_page = () => get_current_page() + 1 === get_pages().length
const go_next_page = () => get_pages()[get_current_page() + 1].click()
const go_first_page = () => get_pages()[0].click()

const go_random_pages = async () => {
  const list = [
    document.querySelector('#menu_row > td:nth-child(2) > a'),
    document.querySelector('#header_menu_link_map > a'),
    document.querySelector('#menu_row > td:nth-child(4) > a'),
    document.querySelector('#menu_row > td:nth-child(5) > a'),
    document.querySelector('#topdisplay > div > table > tbody > tr:nth-child(9) > td > a')
  ]
  await sleep(Math.random() * 1000 + 1000)

  list.get_random = function () {
    return this[Math.floor(Math.random() * this.length)]
  }

  list.get_random().click()
}

const go_redirect = async () => {
  const url = location.href
  const pre = url.split('.')[0].substring(8)
  await set("world", pre)
  const hours = new Date().getHours()
  let delay = 1800
  let variance = 600
  if(hours < 8){
    delay = 3600
    variance = 1200
  }
  const started = await get('started')
  if(started == null) {
    await set('started', parseInt(Math.random() * 10))
    return go_random_pages()
  }if(started <= 0){
    await remove('started')
  }else{
    await set('started', started - 1)
    return go_random_pages()
  }
  location.href = `https://europe-481fe.web.app/?target_url=https://klanlar.org&delay=${Math.abs(Math.random() * variance + delay)}` 
}
const last_attacks = JSON.parse(localStorage.getItem('last_attacks') || "{}")
const update_last_attacks = () => localStorage.setItem('last_attacks', JSON.stringify(last_attacks))
const should_attack_now = (village) => (last_attacks[village] || 0) + (attack_interval * 1000 * 60) < Date.now()
const update_village_last_attack = (village) => last_attacks[village] = Date.now()
const go_world = async () => {
  const world = await get('world')

  const w_con = document.querySelector('div.worlds-container')

  w_con.querySelectorAll('a').forEach(a => {
    if(a.href.includes(world)) a.click()
  }
  )
}




const has_enough_army = (village_army, loot_army) => {
  for(let i = 0; i < village_army.length; i++){
    if(village_army[i] < loot_army[i]) return false
  }

  return true
}

const decrease_village_army = (village_army, loot_army) => {
  for(let i = 0; i < village_army.length; i++){
    village_army[i] -= loot_army[i]
  }
}

async function attack() {
  await sleep(Math.floor(Math.random() * 4000) + 1000)


  botProtection()


  if (location.href.includes('.klanlar.org/game.php')) {

    if (location.href.endsWith('confirm')) {
      const oyuncu = document.querySelector('table.vis').querySelectorAll('td')[2].innerHTML == 'Oyuncu:'
      if(oyuncu){
        location.href = location.href.substring(0, location.href.length - 12)
      }else{
          document.querySelector('#troop_confirm_submit').click()
      }
    } else if(location.href.includes('screen=place')){
      await handle_report()
      // while(isFirstAttack(getNextVillage()))incrementCount()
      configs = JSON.parse(localStorage.getItem('config'))
      village = getNextVillage()
      const isFirstConfig = isFirstAttack(village)
      config = isFirstConfig ? configs[0] : configs[1]

      enoughArmy = doesHaveEnoughArmy(config)

      const loot_reported_village = sessionStorage.getItem('loot_reported_village')
      sessionStorage.removeItem('loot_reported_village')
      if(loot_reported_village){
        config = configs[1]
        enoughArmy = doesHaveEnoughArmy(config)

        if(enoughArmy){
          fillTable(config)
          document.querySelector('#place_target > input').value = loot_reported_village
          sessionStorage.setItem('loot_attacked', 'true')
          await sleep(Math.floor(Math.random() * 1500) + 1500)
          document.querySelector('#target_attack').click()
        }else{
          sessionStorage.setItem('last_unsuccessful_wall', "" + Date.now())
          goLootAssistant()
        }
        await sleep(5000)
      }
      const is_loot_attacked = sessionStorage.getItem('loot_attacked')
      if(is_loot_attacked){
        sessionStorage.removeItem("loot_attacked")
        goLootAssistant()
        await sleep(5000)
      }

      if(sessionStorage.getItem('attack') !== 'true'){
        await sleep(100000000)
      }
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
if(sessionStorage.getItem('attack') == 'true' || attack_interval) attack()



function deleteBarbarReports(){
  if(!location.href.includes('screen=report')) return;

  isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check')
  if(isBotPro && sessionStorage.getItem('attack') == 'true'){
    sendTelegramMessage().then(() => location.href = 'https://www.fuck.com')
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

const goPlace = () => {
  const next_try = parseInt(sessionStorage.getItem('last_unsuccessful_wall') || 0) + (1000 * 60 * 60)
  const should_try_now = Date.now() > next_try
  if(should_try_now) update_last_attacks()
  if(should_try_now) document.querySelector('#quickbar_contents > ul > li:nth-child(5) > span > a').click()
  else return true
}
const goLootAssistant= () => document.querySelector('#manager_icon_farm').click()

async function loot(){
  botProtection()
  const isLootAssistant = location.href.includes('screen=am_farm')
  if(!isLootAssistant) return

  const table = document.getElementById('plunder_list').querySelector('tbody')
  let i = 1;
  const village_army = get_village_army()
  const first_loot = get_first_loot_config()
  const second_loot = get_second_loot_config()
  while(i++ < table.children.length){
    await sleep(50)
    botProtection()
    try{
      const isGreen = table.children[i].querySelector('td:nth-child(2) > img').src.includes('green')
      const village = table.children[i].querySelector('td:nth-child(4) > a').innerText.trim().substr(1,7)
      if(!should_attack_now(village)) continue;
      if(isGreen) {
        if(has_enough_army(village_army, first_loot)){
          table.children[i].querySelector('td:nth-child(9) > a').click()
          decrease_village_army(village_army, first_loot)
          update_village_last_attack(village)
        }else if(has_enough_army(village_army, second_loot)){
          table.children[i].querySelector('td:nth-child(10) > a').click()
          decrease_village_army(village_army, second_loot)
          update_village_last_attack(village)
        }else{
          update_last_attacks()
          go_redirect()
        }
      }
      else if(!table.children[i].querySelector('td:nth-child(4) > img')){
        sessionStorage.setItem('loot_reported_village', village)
        update_village_last_attack(village)
        const goo = goPlace()
        if(goo) sessionStorage.removeItem('loot_reported_village')
      }
    }catch(e){
    }
    await sleep(Math.floor(Math.random() * 250) + 350)

  }
  update_last_attacks()
  await sleep(1000)
  if(!is_last_page()){
    go_next_page()
  }else
  go_redirect()
}
get('started').then(r => {
  if(r != null){
    go_redirect()
  }else{
    if(attack_interval) loot()
  }
})

if(location.href == 'https://www.klanlar.org/') setTimeout(go_world, 3000)
if(location.href.includes("screen=overview") && attack_interval && (sessionStorage.getItem("yuppie") == null || Date.now() - parseInt(sessionStorage.getItem("yuppie")) > 600000)){
  setTimeout(() => {
    sessionStorage.setItem('yuppie', Date.now() + "")
    goLootAssistant()
  }, 1000);
}

setInterval(() => {
  isBotPro = document.querySelectorAll('iframe').length > 0 || document.querySelector('#bot_check') || document.querySelector("td.bot-protection-row") || document.querySelector("div.bot-protection-row") || document.querySelector("#botprotection_quest")
  if(isBotPro){
    sendTelegramMessage().then(() => location.href = 'https://www.fuck.com')
    }
}, 5000);



function sendTelegramMessage(){
  const CHAT_ID = JSON.parse(localStorage.getItem('config'))[2].chat_id
  const TOKEN = "8304581810:AAG-Zmxu77TCjBYa4OzgdEpO6mfjvIiNM9Y"; // your bot token
  const MESSAGE = "Davşan Çavuş nerdedir?";

  return fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: MESSAGE
    })
  })
    .then(() => true)
}

let lastBuy = 0

function confirm(inputs) {
    lastBuy = Date.now()
    setTimeout(() => { document.querySelector('button.btn.evt-confirm-btn.btn-confirm-yes').click()}, 100)
    setTimeout(() => {
      recoverAll()
    }, 200);
}


function buy() {
    const submit = document.querySelector('input.btn.float_right.btn-premium-exchange-buy')
    const wood_stock = parseInt(document.getElementById('premium_exchange_stock_wood').innerText) - 125
    const kil_stock = parseInt(document.getElementById('premium_exchange_stock_stone').innerText) - 125
    const iron_stock = parseInt(document.getElementById('premium_exchange_stock_iron').innerText) - 125

    const inputs = document.querySelectorAll('div.premium-exchange-sep > input')

    if(wood_stock > 0 && wood_stock >= kil_stock && wood_stock >= iron_stock) {inputs[0].value = wood_stock; submit.click(); confirm();}
    else if(kil_stock > 0 && kil_stock >= wood_stock && kil_stock >= iron_stock) {inputs[1].value = kil_stock; submit.click(); confirm();}
    else if(iron_stock > 0 && iron_stock >= kil_stock && iron_stock >= wood_stock) {inputs[2].value = iron_stock; submit.click(); confirm();}

    setTimeout(() => {
      if(inputs[0].value){inputs[0].value = '';}
      if(inputs[1].value){inputs[1].value = ''; }
      if(inputs[2].value){inputs[2].value = ''; }

      recoverAll()
    }, 250);

}



function startPreBot(){
  setInterval(() => {
    if(lastBuy + 10000 < Date.now() ) buy()
  }, 100);
}