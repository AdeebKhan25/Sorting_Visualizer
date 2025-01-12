'use client';

import { AnimationArrayType, SortingAlgorithmType } from '@/libs/types';
import { generateRandomNumberFromInterval, MAX_SPEED } from '@/libs/utils';
import {createContext, useState, useContext, useEffect} from 'react';

interface SortingAlgorithmContextType {
    arrayToSort: number[];
    setArrayToSort: (array: number[]) => void;
    selectedAlgorithm: SortingAlgorithmType;
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
    isSorting: boolean;
    setIsSorting: (isSorting: boolean) => void;
    speed: number;
    setSpeed: (speed: number) => void;
    isAnimationComplete: boolean;
    setIsAnimationComplete: (isAnimationComplete: boolean) => void;
    resetArrayAndAnimation: () => void;
    runAnimation: (animations: AnimationArrayType) => void;
    requireReset: boolean;
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: React.ReactNode }) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithmType>('bubble');
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(MAX_SPEED);
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

    const requireReset = isAnimationComplete || isSorting;

    useEffect(() => {
        resetArrayAndAnimation();
        window.addEventListener('resize', resetArrayAndAnimation);
        return () => {
            window.removeEventListener('resize', resetArrayAndAnimation);
        };
    }, []);

    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById('content-container');
        if (!contentContainer) return;

        const contentContainerWidth = contentContainer.clientWidth;
        const tempArray: number[] = [];
        const numLines = contentContainerWidth / 8;
        const containerHeight = contentContainer.clientHeight;
        const maxLineHeight = Math.max(containerHeight - 420, 100);

        for(let i = 0; i < numLines; i++) {
            tempArray.push(generateRandomNumberFromInterval(10, maxLineHeight + 250));
        }

        setArrayToSort(tempArray);
        setIsAnimationComplete(false);
        setIsSorting(false);

        const highestId = window.setTimeout(() => {
            for(let i = highestId; i >= 0; i--) {
                window.clearTimeout(i);
            }
        }, 0);

        setTimeout(() => {
            const arrayLines = document.getElementsByClassName('array-line') as HTMLCollectionOf<HTMLElement>;
            for(let i=0; i < arrayLines.length; i++) {
                arrayLines[i].classList.remove('change-line-color');
                arrayLines[i].classList.add('default-line-color');
            }
        }, 0);

    };

    const runAnimation = (animations:AnimationArrayType) => {
        setIsSorting(true);
        const inverseSpeed = (1/speed) * 200;
        const arrayLines = document.getElementsByClassName('array-line') as HTMLCollectionOf<HTMLElement>;

        const updateClassList = ({
            indexes,
            addClassName,
            removeClassName
        }: {
            indexes: number[],
            addClassName: string,
            removeClassName: string
        }) => {
            indexes.forEach((index) => {
                arrayLines[index].classList.add(addClassName);
                arrayLines[index].classList.remove(removeClassName);
            });
        }

        const updateHeightValue = ({
            lineIndex,
            newHeight,
        }: {
            lineIndex: number,
            newHeight: number | undefined,
        }) => {
            if (newHeight === undefined) return;
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        }

        animations.forEach((animation, index) => {
            setTimeout(() => {
                const [values, isSwap] = animation;
                if (!isSwap) {
                    updateClassList({indexes:values, addClassName:'change-line-color', removeClassName:'default-line-color'});
                    setTimeout(() => {
                        updateClassList({indexes:values, addClassName:'default-line-color', removeClassName:'change-line-color'});
                    }, inverseSpeed);
                }
                else {
                    const [lineIndex, newHeight] = values;
                    updateHeightValue({lineIndex, newHeight});
                }
            }, index * inverseSpeed);
        });

        const finalTimeOut = animations.length * inverseSpeed;
        setTimeout(() => {
            Array.from(arrayLines).forEach((line) => {
                line.classList.add('pulse-animation','change-line-color');
                line.classList.remove('default-line-color');
            });
            setTimeout(() => {
                Array.from(arrayLines).forEach((line) => {
                    line.classList.remove('pulse-animation','change-line-color');
                    line.classList.add('default-line-color');
                });
                setIsSorting(false);
                setIsAnimationComplete(true);
            }, 1000);
        }, finalTimeOut);

    };

    const value = {
        arrayToSort,
        setArrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        speed,
        setSpeed,
        isAnimationComplete,
        setIsAnimationComplete,
        resetArrayAndAnimation,
        runAnimation,
        requireReset
    };

    return <SortingAlgorithmContext.Provider value = {value}>{children}</SortingAlgorithmContext.Provider>;
}

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext);
    if (!context) {
        throw new Error('useSortingAlgorithmContext must be used within a SortingAlgorithmProvider');
    }
    return context;
}