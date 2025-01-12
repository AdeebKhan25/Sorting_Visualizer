import { MAX_SPEED, MIN_SPEED } from "@/libs/utils"
import React from "react";

export const Slider = ({
    min = MIN_SPEED,
    max = MAX_SPEED,
    step = 10,
    value,
    handleChange,
    isDisabled = false,
}: {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
}) => {
    return (
        <div className="flex gap-2 items-center justify-center">
            <span className="text-center text-white">Slow</span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={isDisabled}
                className="appearance-none h-2 rounded-lg cursor-pointer bg-purple-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 w-full"
            />
            <span className="text-center text-white">Fast</span>
        </div>
    );
}