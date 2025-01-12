'use client';

import { Select } from "@/components/input/select";
import { Slider } from "@/components/input/slider";
import { useSortingAlgorithmContext } from "@/context/visualizer";
import { algorithmOptions, generateAnimationArray, sortingAlgoData } from "@/libs/utils";
import { SortingAlgorithmType } from "@/libs/types";
import { useEffect } from "react";
import { RxReset } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";

export default function Home() {

  const {
    arrayToSort, 
    isSorting, 
    setSpeed, 
    speed, 
    selectedAlgorithm, 
    setSelectedAlgorithm, 
    requireReset, 
    resetArrayAndAnimation, 
    runAnimation
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  }

  const handlePlay = () => {
    if(requireReset) {
      resetArrayAndAnimation();
      return;
    }
    generateAnimationArray(arrayToSort, selectedAlgorithm, isSorting, runAnimation);
  }

  useEffect(() => {
    console.log("Algo", selectedAlgorithm);
  }, [selectedAlgorithm]);

  return (
  <main className="absolute top-0 h-screen w-screen bg-black">

    <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1200px] mx-auto my-4 px-4 py-4 lg:px-8 space-y-4 lg:space-y-0">
      {/* Title Section */}
      <div className="flex items-center space-x-2">
        <h1 className="text-white text-3xl font-bold">Sorting Visualizer</h1>
      </div>

      {/* Control Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-right text-white flex-1 max-w-[700px] text-sm lg:text-base">
        <Slider
          value={speed}
          handleChange={(e) => setSpeed(Number(e.target.value))}
          isDisabled={isSorting}
        />
        <Select
          options={algorithmOptions}
          defaultValue={selectedAlgorithm}
          onChange={handleSelectChange}
          isDisabled={isSorting}
        />
        <button className="flex items-center justify-center" onClick={handlePlay}>
          {requireReset ? (
            <RxReset className="text-white h-8 w-8" />
          ) : (
            <FaPlayCircle className="text-green-500 h-8 w-8" />
          )} 
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex justify-center items-center grow px-4 lg:px-8 pt-6">
      <div
        id="content-container"
        className="flex flex-col max-w-[1024px] w-full bg-black border border-gray-700 rounded-lg p-4 space-y-4"
      >
        {/* Info Section */}
        <div className="text-white text-center">
          <p className="text-xl font-semibold">{sortingAlgoData[selectedAlgorithm].title}</p>
          <p className="text-sm mt-2">{sortingAlgoData[selectedAlgorithm].description}</p>
        </div>

          {/* Complexity Info */}
        <div className="flex justify-center gap-4 mt-2 text-white">
          <span className="text-sm font-semibold">Worst Case TC: {sortingAlgoData[selectedAlgorithm].worstCase}</span>
          <span className="text-sm font-semibold">Best Case TC: {sortingAlgoData[selectedAlgorithm].bestCase}</span>
          <span className="text-sm font-semibold">Average Case TC: {sortingAlgoData[selectedAlgorithm].averageCase}</span>
        </div>

        {/* Sorting Blocks */}
        <div className="w-full flex justify-center items-end space-x-1">
          {arrayToSort.map((value, index) => (
            <div
              key={index}
              className="array-line default-line-color relative w-2 shadow-lg rounded"
              style={{ height: `${value}px` }}
            />
          ))}
        </div>
      </div>
    </div>


  </main>
  );
}
