const round1=localStorage.getItem("round1");
const round2=localStorage.getItem("round2");
const round3=localStorage.getItem("round3");
const round4=localStorage.getItem("round4");
const round5 = localStorage.getItem("round5");
let time=[];
let roundtime=[]
let rounds=[round1,round2,round3,round4,round5];
let timerElement;
let score=0;

const calcTime=(round)=>{
    let t=0;
    if(round){
        time.push(parseInt(round,10));
    }
    return time;
}

for(let i=0;i<rounds.length;i++){
    calcTime(rounds[i]);
}

for (let i = 0; i < time.length; i++) {
    if (i === 0) {
        roundtime.push(time[i]); 
    } else {
        roundtime.push(time[i] - time[i - 1]); 
    }
}

const calcScore =(time) => {
    if(time<=20){
        score+=time+10;
    }
    else{
        score+=time;
    }
    return score;
}

for(let i=0;i<roundtime.length;i++){
    calcScore(roundtime[i]);
}

const scoreElement = document.getElementById('score');
const timeTakenElement = document.getElementById('time-taken');
const bestTimeElement = document.getElementById('best-time');

scoreElement.textContent = score;

const sum = roundtime.reduce((i,j) => {
    return i+j;
}, 0);

timeTakenElement.textContent = sum;

// Initialize an array to store all round 5 data.
const round5Data = [];

// Iterate through all keys in localStorage.
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  // Check if the key is related to round 5.
  if (key["round5"]) {
    // Retrieve the value associated with the key and add it to the round5Data array.
    round5Data.push(localStorage.getItem(key));
  }
}

// Now, round5Data contains an array of all data related to round 5 in localStorage.
console.log(round5Data);



//bestTimeElement.textContent=bestTime;
