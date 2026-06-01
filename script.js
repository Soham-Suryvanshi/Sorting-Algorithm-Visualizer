let arr=[];


function generateBars(){
    arr=[];
    for(let i=0;i<10;i++){
        arr.push(Math.floor(Math.random()*200)+1);
    }
    renderBars();

}
function renderBars(){
    const barsContainer = document.querySelector(".bars");
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
function swapt(){
[arr[0],arr[1]]=[arr[1],arr[0]];
renderBars();
}
function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms));
}


async function bubbleSort() {
    for(let i=0;i<arr.length-1;i++) {
        for(let j=0;j<arr.length-i-1;j++) {

            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                renderBars();
                await sleep(150);
            }
        }
    }
}
    

    const genbut=document.querySelector("#generate-button")

        genbut.addEventListener("click", generateBars);

    
    const bubsort=document.querySelector("#bubble-sort");
        bubsort.addEventListener("click",bubbleSort);