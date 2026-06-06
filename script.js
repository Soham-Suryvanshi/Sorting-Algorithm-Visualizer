const barsContainer = document.querySelector(".bars");

let arr=[];
let isSorting=false;


function generateBars(){
    arr=[];
    for(let i=0;i<10;i++){
        arr.push(Math.floor(Math.random()*200)+1);
    }
    renderBars();

}
function renderBars(){
    
    barsContainer.innerHTML="";

    for(let i=0;i<arr.length;i++){
        const bar=document.createElement("div");
        bar.classList.add("bar");
        let value = arr[i];
        bar.style.height= value + "px";
        bar.textContent=arr[i];
        barsContainer.appendChild(bar);
        
    }
}
const swap=(arr,a,b)=>{
[arr[a],arr[b]]=[arr[b],arr[a]];
return arr;
};
function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms));
}

async function animate(){
    renderBars();
    await sleep(150);
}


async function bubbleSort() {
    if(isSorting)return;

    isSorting=true;
    for(let i=0;i<arr.length-1;i++) {
        for(let j=0;j<arr.length-i-1;j++) {

            if(arr[j] > arr[j+1]) {
                swap(arr,j,j+1);
                await animate();
            }
        }
    }
    isSorting=false;
}

async function insertionSort() {
    if(isSorting)return 
    isSorting=true;
    for(let i=1;i<arr.length;i++) {
        j=i;
        while(j-1>=0 && arr[j-1]>arr[j]){
            swap(arr,j,j-1);
            await animate();
            j-=1;
        }
    }
    isSorting=false;
}
    

    const genbut=document.querySelector("#generate-button")

        genbut.addEventListener("click", generateBars);

    
    const bubsort=document.querySelector("#bubble-sort");
        bubsort.addEventListener("click",bubbleSort);

    const insort=document.querySelector("#insertion-sort");
        insort.addEventListener("click",insertionSort);