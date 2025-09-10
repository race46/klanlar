
// const interval = setInterval(() => {
  // if(window.PremiumExchange != null){
    // window.postMessage({ type: "FROM_PAGE", value: window.PremiumExchange }, "*");
  // }
// }, 10);


function recover(elem) {
    elem.value = ''; // inputu temizle

    let a = elem;
    let t = a.dataset.resource;
    let n = a.dataset.type;
    let r = a.value;

    let c = document.querySelector("#premium_exchange_" + n + "_" + t + " .cost-container");

    if (r) {
        // diğer inputları disable et
        document.querySelectorAll(".premium-exchange-input").forEach(input => {
            if (input.name !== a.name) {
                input.setAttribute("disabled", "disabled");
            }
        });

        r = parseInt(r);
        if (isNaN(r)) r = 0;

        let e;
        if (n === window.PremiumExchange.TYPE_BUY) {
            e = window.PremiumExchange.validateBuyAmount(t, r);
            n = Math.ceil(window.PremiumExchange.calculateCost(t, r));
        } else {
            e = window.PremiumExchange.validateSellAmount(t, r);
            n = Math.abs(Math.floor(window.PremiumExchange.calculateCost(t, -r)));
        }

        if (e === true) {
            c.querySelector(".icon").style.display = "block";
            c.querySelector(".cost").textContent = n;

            if (window.PremiumExchange.errors.hasOwnProperty(t)) {
                delete window.PremiumExchange.errors[t];
            }

            if (window.mobile) {
                let table = a.closest("table");
                if (table) {
                    table.querySelector(".premium-exchange-error").style.display = "none";
                }
            }
        } else {
            let img = document.createElement("img");
            img.src = Format.image_src("error.png");
            img.alt = "";
            img.className = "tooltip";
            img.title = e;

            c.querySelector(".icon").style.display = "none";
            c.querySelector(".cost").innerHTML = "";
            c.querySelector(".cost").appendChild(img);

            UI.ToolTip(c.querySelector(".tooltip"));
            window.PremiumExchange.errors[t] = e;

            if (window.mobile) {
                let table = a.closest("table");
                if (table) {
                    let err = table.querySelector(".premium-exchange-error");
                    err.style.display = "table-row";
                    err.querySelector("td").textContent = e;
                }
            }
        }
    } else {
        window.PremiumExchange.updateUI();
        c.querySelector(".icon").style.display = "block";
        c.querySelector(".cost").textContent = "0";

        if (window.PremiumExchange.errors.hasOwnProperty(t)) {
            delete window.PremiumExchange.errors[t];
        }

        if (window.mobile) {
            let table = a.closest("table");
            if (table) {
                table.querySelector(".premium-exchange-error").style.display = "none";
            }
        }
    }
}

window.addEventListener('message', (e) => {
      const inputs = document.querySelectorAll('div.premium-exchange-sep > input')
      recover(inputs[0])
      recover(inputs[1])
      recover(inputs[2])

})

setTimeout(() => {
  setInterval(() => {
    if(location.href.endsWith('&screen=market&mode=exchange'))
    window.PremiumExchange.loadData()
  }, 2500);
}, 2500);