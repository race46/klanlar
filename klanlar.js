JAVASCRIPT:
village_location = document.querySelector('#menu_row2 > td:nth-child(2) > b').innerText.substring(1,8);
x = parseInt(village_location.substring(0,3));
y = parseInt(village_location.substring(4,7));



console.log(x,y);

function getCord(x,y){
    console.log(x,y);
};


for(let i = 1; i < 10; i++){
    xx = x - i;
    yy = y + i;

    for(let j = 0; j < 2 * i; j++){
        getCord(xx,yy);
        xx +=1;
    }

    for(let j = 0; j < 2 * i; j++){
        getCord(xx,yy);
        yy -=1;
    }

    for(let j = 0; j < 2 * i; j++){
        getCord(xx,yy);
        xx -=1;
    }

    for(let j = 0; j < 2 * i; j++){
        getCord(xx,yy);
        yy +=1;
    }

    console.log("");

}

