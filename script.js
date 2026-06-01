let arr=[];


function generateBars(){
    arr=[];
    for(let i=0;i<10;i++){
    arr.push(Math.floor(Math.random()*200)+1);
}

const barsContainer = document.querySelector(".bars");
barsContainer.innerHTML=" ";

for(let i=0;i<10;i++){
   const bar=document.createElement("div");
bar.classList.add("bar");
let value = arr[i];
bar.style.height= value + "px";
barsContainer.appendChild(bar);
}
}

const genbut=document.querySelector("#generate-button")

genbut.addEventListener("click", generateBars);