import { selectOptionsType } from "@/libs/types";

export const Select = ({
    options,
    defaultValue,
    onChange,
    isDisabled = false,
}: {
    options: selectOptionsType[];
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isDisabled?: boolean;
}) => {
    return (
        <div className="inline-block relative w-32 text-center">
            <select
                onChange={onChange}
                disabled={isDisabled}
                defaultValue={defaultValue}
                className="w-full appearance-none h-8 rounded-xl cursor-pointer bg-purple-300 text-black px-2 text-left"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                className="fill-purple-300 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    )
}