const state = {
    array: [],
    isSorting: false,
    selectedAlgo: ""
};

const dropdown = document.getElementById("AlgoSelect");
const generateBtn = document.getElementById("generateBtn");
const barsContainer = document.querySelector(".bars");

function generateArray(size = 10) {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * 200) + 1
    );
}

function renderBars(array) {
    barsContainer.innerHTML = "";

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        barsContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animate(array) {
    renderBars(array);
    await sleep(120);
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

async function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                await animate(array);
            }
        }
    }
}

async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let j = i;

        while (j > 0 && array[j - 1] > array[j]) {
            swap(array, j, j - 1);
            await animate(array);
            j--;
        }
    }
}

// BUG FIX: Removed stray brackets and 'state.isSorting = false;' that were floating here

function mergeSortConsole(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const left = mergeSortConsole(arr.slice(0, mid));
    const right = mergeSortConsole(arr.slice(mid));

    const merged = merge(left, right);

    console.log("merge:", merged);
    return merged;
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

dropdown.addEventListener("change", (e) => {
    state.selectedAlgo = e.target.value;
    generateBtn.disabled = !state.selectedAlgo;
});

generateBtn.addEventListener("click", async () => {
    if (state.isSorting) return;

    state.isSorting = true;
    generateBtn.disabled = true;
    dropdown.disabled = true;

    state.array = generateArray();
    renderBars(state.array);

    switch (state.selectedAlgo) {
        case "bubble":
            await bubbleSort(state.array);
            break;

        case "insertion":
            await insertionSort(state.array);
            break;

        case "merge":
            console.log(mergeSortConsole([...state.array]));
            break;
    }

    state.isSorting = false;
    generateBtn.disabled = false;
    dropdown.disabled = false;
});