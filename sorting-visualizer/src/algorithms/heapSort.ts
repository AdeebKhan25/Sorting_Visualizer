import { AnimationArrayType } from "@/libs/types";

function heapify(
  array: number[],
  n: number,
  i: number,
  animations: AnimationArrayType
) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child index
  const right = 2 * i + 2; // Right child index

  // Compare left child with root
  if (left < n && array[left] > array[largest]) {
    animations.push([[left, largest], false]); // Comparing left and largest
    largest = left;
  }

  // Compare right child with largest
  if (right < n && array[right] > array[largest]) {
    animations.push([[right, largest], false]); // Comparing right and largest
    largest = right;
  }

  if (largest !== i) {
    animations.push([[i, array[largest]], true]); // Swapping root with largest
    animations.push([[largest, array[i]], true]); // Swapping largest with root
    [array[i], array[largest]] = [array[largest], array[i]];

    heapify(array, n, largest, animations);
  }
}

function runHeapSort(array: number[], animations: AnimationArrayType) {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([[0, array[i]], true]); // Swapping root with the last element
    animations.push([[i, array[0]], true]); // Swapping last element with root
    [array[0], array[i]] = [array[i], array[0]];

    heapify(array, i, 0, animations);
  }
}

export function generateHeapSortAnimation(
  array: number[],
  isSorting: boolean,
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return;

  const animations: AnimationArrayType = [];
  const tempArray = array.slice();
  runHeapSort(tempArray, animations);
  runAnimation(animations);
}
