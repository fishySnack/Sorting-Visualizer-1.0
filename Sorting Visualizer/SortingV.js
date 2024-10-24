
const n = 20;
const array = [];
//so that it plays right away
init();

function init(){
    for(let i=0; i < n; i ++){
        array[i] = Math.random();
    }
    showBars();
}

function showBars(move){
    container.innerHTML = "";
    for(let i= 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] *100+"%";
        bar.classList.add("bar");
        //select the one that are going to be swapped
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = move.type=="swap"?"red":"blue";
        }
        container.appendChild(bar);
    }
}

function bubbleSort(array){
    //moves here is used to logged the changes in the array for later display
    const moves= [];
    do{
        var swapped = false;
        for(let i = 1; i < array.length; i++){
            moves.push({indices:[i-1,i],type: "comp"});
            if(array[i-1] > array[i]){
                moves.push({indices:[i-1,i],type: "swap"});
                let temp = array[i-1];
                array[i-1] = array[i];
                array[i] = temp;
                swapped = true;
            }
        }

    }while(swapped)

    return moves;
}

function bubbleSortPlay(){
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        //this makes it so the red color is gone
        showBars();
        return;
    }
    //takes moves first 2 element as i and j
    const move = moves.shift();
    const [i,j] = move.indices;
    //switch array[i] and array[j] together
    //this is an simplier and more compact way to write it
    if(move.type=="swap"){
        [array[i],array[j]] = [array[j], array[i]];
    }

    showBars(move);
    //calls the function after waitng 50ms
    setTimeout(function(){
        animate(moves);
    },50)
}

