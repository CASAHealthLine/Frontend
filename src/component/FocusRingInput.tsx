import React from "react";

interface FocusInputProps {
    value: string;
    maxLength?: number;
    children?: React.ReactNode;
    containerStyle?: React.CSSProperties;
    [key: string]: any;
}

const FocusInput = ({ value, maxLength, children, containerStyle, ...props }: FocusInputProps) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = value;
        }
    }, [value]);

    return (
        <div
            className={`px-3 mb-4 border rounded-lg ${
                isFocused ? "ring-2 ring-green-500 border-green-500" : ""
            } flex-row flex items-center gap-2`}
            style={containerStyle}
        >
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="grow py-2 border-none focus:outline-none"
                maxLength={maxLength}
                ref={inputRef}
                {...props}
            />
            {children}
            {value && maxLength && (
                <p className="text-sm text-gray-400 select-none m-0">
                    {value.length}/{maxLength}
                </p>
            )}
        </div>
    );
};

export default FocusInput;