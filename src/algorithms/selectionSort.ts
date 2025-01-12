import { AnimationArrayType } from "@/libs/types";

function runSelectionSort(array: number[], animations: AnimationArrayType) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            animations.push([[j, i], false]);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        animations.push([[i, array[minIndex]], true]);
        animations.push([[minIndex, array[i]], true]);
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
}

export function generateSelectionSortAnimation (
    array: number[], 
    isSorting: boolean, 
    runAnimation: (animations: AnimationArrayType) => void
) {
    if (isSorting) return;
    if (array.length <= 1) return;

    const animations: AnimationArrayType = [];
    const tempArray = array.slice();
    runSelectionSort(tempArray, animations);
    runAnimation(animations);
}