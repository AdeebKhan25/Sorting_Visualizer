import { AnimationArrayType } from "@/libs/types";

function runInsertionSort(array: number[], animations: AnimationArrayType) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;
        animations.push([[i], false]);
        while (j >= 0 && array[j] > key) {
            animations.push([[j, j + 1, i], false]);
            array[j + 1] = array[j];
            animations.push([[j + 1, array[j]], true]);
            j = j - 1;
        }
        array[j + 1] = key;
        animations.push([[j + 1, key], true]);
    }
}

export function generateInsertionSortAnimation (
    array: number[], 
    isSorting: boolean, 
    runAnimation: (animations: AnimationArrayType) => void
) {
    if (isSorting) return;
    if (array.length <= 1) return;

    const animations: AnimationArrayType = [];
    const tempArray = array.slice();
    runInsertionSort(tempArray, animations);
    runAnimation(animations);
}