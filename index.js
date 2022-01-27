let size = 4;
let score = 0;
score_tile = document.getElementById('scorelet size = 4;
let score = 0;
score_tile = document.getElementById('score_tile');
table_body = document.getElementById('table_body');
for (let i = 0; i < size; i++) {
    var tr = document.createElement('tr');
    for(let j = 0;j < size; j++){
        var td = document.createElement('td');
        td.setAttribute('class', 'cell');
        tr.appendChild(td);
    }
    table_body.appendChild(tr)
}

// console.log()

let arr = [
    [0 , 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

// for random
let empty_arr = [{}];
let empty_size = 0
function empty_arr_fn(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(arr[i][j] == 0){
                empty_arr.push({i,j});
                empty_size = empty_size+1;
            }
        }
    }
}
function random_gen(){
    empty_arr = [{}];
    empty_size = 0;
    empty_arr_fn();
    if(empty_size == 0){
        game_over();
    }
    let ind_random = Math.round(1+(empty_size-1)*Math.random());
    let probability = Math.random();
    if(probability>0.7){
        arr[empty_arr[ind_random].i][empty_arr[ind_random].j] = 4;  
    }
    else{ 
        arr[empty_arr[ind_random].i][empty_arr[ind_random].j] = 2;  
    }
    // console.log(empty_size)
    // console.log(empty_arr);
}
 


// displaying the grid 

function grid_display(){    
    let box = document.getElementsByClassName('cell');
    let c = 0;
    for(let i = 0;i<4;i++){
        for(let j = 0;j<4;j++){
            if(arr[i][j] == 0){
                box[c].innerHTML = "."
                box[c].classList.add("empty"); 
                box[c].style.backgroundColor = `rgb(233, 185, ${143}` 
            }
            else{ 
                box[c].classList.remove("empty");
                box[c].innerHTML = arr[i][j];
                var e = 233; var w = 185; var q = 143;
                q = q+arr[i][j]*2;
                if(q>255){
                    w = w-arr[i][j]/2;
                }
                if(w<50){
                    e = e-arr[i][j]/8;
                }
                box[c].style.backgroundColor = `rgb(${e}, ${w}, ${q})`; 
            }
            if(arr[i][j]>1000){
                box[c].classList.add("four_digit");
            }
            else{
                box[c].classList.remove("four_digit");
            }
            c = c+1;
        }
    }
}       


function main(){
    random_gen();
    grid_display();
    add_score();
    game_won();

    // console.log(score);
}

// left slide functions
function merge_left(){
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if(arr[i][j-1] === arr[i][j]){
                arr[i][j-1]  = arr[i][j]*2;
                arr[i][j] = 0;
                score = score + arr[i][j-1]/2;
            }
        }
    }
}
function slide_help_left(a){
    for (let i = 0; i < 4; i++) {
        let x_arr = [];
        let non_zero = 0;
        for (let j = 0; j < 4; j++) {
            if(arr[i][j]!=0){
                x_arr.push(arr[i][j])
                non_zero = non_zero+1;
            }            
        }
        let zero = 4 - non_zero;
        while(zero--){
            x_arr.push(0);
        }   

        arr[i] = x_arr;    
    }
    score = score + 1;
}
function slide_left(){
    slide_help_left(0);
    merge_left();
    slide_help_left();  
}


// right slide functions 
function merge_right(){
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >=0; j--) {
            if(arr[i][j] == arr[i][j+1]){
                arr[i][j+1] = arr[i][j]*2;
                arr[i][j] = 0;
                score = score + arr[i][j+1]/2;
            }
        }
    }
}
function slide_help_right(){
    for (let i = 0; i < 4; i++) {
        let x_arr = [];
        let non_zero = 0;
        for (let j = 3; j >=0; j--) {
            if(arr[i][j]!=0){
                x_arr.push(arr[i][j]);
                non_zero = non_zero+1;
            }
        }   
        let zero = 4-non_zero;
        while(zero--){
            x_arr.push(0);
        }     
        let temp = x_arr.reverse();
        arr[i] = temp;
        score = score + 1;
    }
}
function slide_right(){
    slide_help_right();
    merge_right();
    slide_help_right();
}


// for verticles
function transpose_arr(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
            let temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;          
        }
    }
}


// slide down

function slide_down(){
    transpose_arr();
    slide_right();
    transpose_arr();
}
// slide up

function slide_up(){
    transpose_arr();
    slide_left();
    transpose_arr();
}
grid_display()

window.addEventListener('keydown', e=>{
    switch (e.key){
        case 'ArrowUp':
            slide_up();
            main();
            break;
        case 'ArrowDown':
            slide_down();
            main();
            break;
        case 'ArrowLeft':
            slide_left();
            main()
            break;
        case 'ArrowRight':
            slide_right()
            main();
            break;
        default:
            break;                  
    }
    
})


function game_over(){
    window.alert("Game over, Press any key to restart");
    arr = [
        [0 , 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    score = 0;
    main(); 
}

function game_won(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(arr[i][j] == 2048){
                window.alert("You won, press any key to continue");
            }
        }
        
    }
}

function add_score(){
    score_tile.innerHTML = `Score: ${score}`;
}


main();_tile');
table_body = document.getElementById('table_body');
for (let i = 0; i < size; i++) {
    var tr = document.createElement('tr');
    for(let j = 0;j < size; j++){
        var td = document.createElement('td');
        td.setAttribute('class', 'cell');
        tr.appendChild(td);
    }
    table_body.appendChild(tr)
}

// console.log()

let arr = [
    [0 , 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

// for random
let empty_arr = [{}];
let empty_size = 0
function empty_arr_fn(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(arr[i][j] == 0){
                empty_arr.push({i,j});
                empty_size = empty_size+1;
            }
        }
    }
}
function random_gen(){
    empty_arr = [{}];
    empty_size = 0;
    empty_arr_fn();
    if(empty_size == 0){
        game_over();
    }
    let ind_random = Math.round(1+(empty_size-1)*Math.random());
    let probability = Math.random();
    if(probability>0.7){
        arr[empty_arr[ind_random].i][empty_arr[ind_random].j] = 4;  
    }
    else{ 
        arr[empty_arr[ind_random].i][empty_arr[ind_random].j] = 2;  
    }
    // console.log(empty_size)
    // console.log(empty_arr);
}
 


// displaying the grid 

function grid_display(){    
    let box = document.getElementsByClassName('cell');
    let c = 0;
    for(let i = 0;i<4;i++){
        for(let j = 0;j<4;j++){
            if(arr[i][j] == 0){
                box[c].innerHTML = "."
                box[c].classList.add("empty"); 
                box[c].style.backgroundColor = `rgb(233, 185, ${143}` 
            }
            else{ 
                box[c].classList.remove("empty");
                box[c].innerHTML = arr[i][j];
                var e = 233; var w = 185; var q = 143;
                q = q+arr[i][j]*2;
                if(q>255){
                    w = w-arr[i][j]/2;
                }
                if(w<50){
                    e = e-arr[i][j]/4;
                }
                box[c].style.backgroundColor = `rgb(${e}, ${w}, ${q})` 
            }
            c = c+1;
        }
    }
}       


function main(){
    random_gen();
    grid_display();
    add_score();
    game_won();

    // console.log(score);
}

// left slide functions
function merge_left(){
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if(arr[i][j-1] === arr[i][j]){
                arr[i][j-1]  = arr[i][j]*2;
                arr[i][j] = 0;
                score = score + arr[i][j-1]/2;
            }
        }
    }
}
function slide_help_left(a){
    for (let i = 0; i < 4; i++) {
        let x_arr = [];
        let non_zero = 0;
        for (let j = 0; j < 4; j++) {
            if(arr[i][j]!=0){
                x_arr.push(arr[i][j])
                non_zero = non_zero+1;
            }            
        }
        let zero = 4 - non_zero;
        while(zero--){
            x_arr.push(0);
        }   

        arr[i] = x_arr;    
    }
    score = score + 1;
}
function slide_left(){
    slide_help_left(0);
    merge_left();
    slide_help_left();  
}


// right slide functions 
function merge_right(){
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >=0; j--) {
            if(arr[i][j] == arr[i][j+1]){
                arr[i][j+1] = arr[i][j]*2;
                arr[i][j] = 0;
                score = score + arr[i][j+1]/2;
            }
        }
    }
}
function slide_help_right(){
    for (let i = 0; i < 4; i++) {
        let x_arr = [];
        let non_zero = 0;
        for (let j = 3; j >=0; j--) {
            if(arr[i][j]!=0){
                x_arr.push(arr[i][j]);
                non_zero = non_zero+1;
            }
        }   
        let zero = 4-non_zero;
        while(zero--){
            x_arr.push(0);
        }     
        let temp = x_arr.reverse();
        arr[i] = temp;
        score = score + 1;
    }
}
function slide_right(){
    slide_help_right();
    merge_right();
    slide_help_right();
}


// for verticles
function transpose_arr(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < i; j++) {
            let temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;          
        }
    }
}


// slide down

function slide_down(){
    transpose_arr();
    slide_right();
    transpose_arr();
}
// slide up

function slide_up(){
    transpose_arr();
    slide_left();
    transpose_arr();
}
grid_display()

window.addEventListener('keydown', e=>{
    switch (e.key){
        case 'ArrowUp':
            slide_up();
            main();
            break;
        case 'ArrowDown':
            slide_down();
            main();
            break;
        case 'ArrowLeft':
            slide_left();
            main()
            break;
        case 'ArrowRight':
            slide_right()
            main();
            break;
        default:
            break;                  
    }
    
})


function game_over(){
    window.alert("Game over, Press any key to restart");
    arr = [
        [0 , 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    score = 0;
    main(); 
}

function game_won(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(arr[i][j] == 2048){
                window.alert("You won, press any key to continue");
            }
        }
        
    }
}

function add_score(){
    score_tile.innerHTML = `Score: ${score}`;
}


main();
