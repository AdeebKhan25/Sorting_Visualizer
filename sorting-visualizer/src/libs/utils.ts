import { generateBubbleSortAnimation } from "@/algorithms/bubbleSort";
import { AnimationArrayType, SortingAlgorithmType } from "./types";
import { generateInsertionSortAnimation } from "@/algorithms/insertionSort";
import { generateSelectionSortAnimation } from "@/algorithms/selectionSort";
import { generateMergeSortAnimation } from "@/algorithms/mergeSort";
import { generateQuickSortAnimation } from "@/algorithms/quickSort";
import { generateHeapSortAnimation } from "@/algorithms/heapSort";

export const MIN_SPEED = 50;
export const MAX_SPEED = 200;

export function generateRandomNumberFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'selection', label: 'Selection Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'quick', label: 'Quick Sort' },
    { value: 'heap', label: 'Heap Sort' },
]

export function generateAnimationArray(
    array: number[], 
    selectedAlgorithm: SortingAlgorithmType, 
    isSorting: boolean, 
    runAnimation: (animations: AnimationArrayType) => void) {
        switch(selectedAlgorithm) {
            case 'bubble':
                generateBubbleSortAnimation(array, isSorting, runAnimation);
                break;
            case 'insertion':
                generateInsertionSortAnimation(array, isSorting, runAnimation);
                break;
            case 'selection':
                generateSelectionSortAnimation(array, isSorting, runAnimation);
                break;
            case 'merge':
                generateMergeSortAnimation(array, isSorting, runAnimation);
                break;
            case 'quick':
                generateQuickSortAnimation(array, isSorting, runAnimation);
                break;
            case 'heap':
                generateHeapSortAnimation(array, isSorting, runAnimation);
                break;
            default:
                break;
        }
    }

export const sortingAlgoData = {
    bubble: {
        title: 'Bubble Sort',
        description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
        worstCase: 'O(n^2)',
        bestCase: 'O(n)',
        averageCase: 'O(n^2)',
    },
    insertion: {
        title: 'Insertion Sort',
        description: 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
        worstCase: 'O(n^2)',
        bestCase: 'O(n)',
        averageCase: 'O(n^2)',
    },
    selection: {
        title: 'Selection Sort',
        description: 'Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.',
        worstCase: 'O(n^2)',
        bestCase: 'O(n^2)',
        averageCase: 'O(n^2)',
    },
    merge: {
        title: 'Merge Sort',
        description: 'Merge Sort is an efficient, stable, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output.',
        worstCase: 'O(n log n)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
    },
    quick: {
        title: 'Quick Sort',
        description: 'Quick Sort is an efficient sorting algorithm. It is a comparison sort and is not a stable sort. Quick Sort can be implemented with an in-place partitioning algorithm, so the entire sort can be done with only O(log n) additional space.',
        worstCase: 'O(n^2)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
    },
    heap: {
        title: 'Heap Sort',
        description: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It is not a stable sort, but it is an in-place sort.',
        worstCase: 'O(n log n)',
        bestCase: 'O(n log n)',
        averageCase: 'O(n log n)',
    }
}
