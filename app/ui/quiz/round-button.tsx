interface RoundButtonProps {
    colour: string,
    symbol: string,
    fontSize: number,
    onClick?: () => void,
};

export default function RoundButton({
    colour,
    symbol,
    fontSize,
    onClick,
}: RoundButtonProps) {
    const colourStyles = {
        red: "bg-red-500 hover:bg-red-400 active:bg-red-600",
        green: "bg-green-500 hover:bg-green-400 active:bg-green-600",
        yellow: "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600",
    }[colour] || "bg-gray-500 hover:bg-gray-400 active:bg-gray-600";

    return <button
        className={`flex items-center justify-center p-2 text-white rounded-full cursor-pointer transition ease-in-out ${colourStyles}`}
        onClick={onClick}
    >
        <span
            className="material-symbols-outlined"
            style={{ fontSize: `${fontSize}px` }}
        >
            {symbol}
        </span>
    </button>;
}