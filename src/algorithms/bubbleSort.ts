import { AnimationArrayType } from "@/libs/types";

function runBubbleSort(array: number[], animations: AnimationArrayType) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([[j, j + 1], false]);
            if (array[j] > array[j + 1]) {
                animations.push([[j, array[j + 1]], true]);
                animations.push([[j + 1, array[j]], true]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}

export function generateBubbleSortAnimation (
    array: number[], 
    isSorting: boolean, 
    runAnimation: (animations: AnimationArrayType) => void
) {
    if (isSorting) return;
    if (array.length <= 1) return;

    const animations: AnimationArrayType = [];
    const tempArray = array.slice();
    runBubbleSort(tempArray, animations);
    runAnimation(animations);
}