interface RoundButtonProps {
    colour: string,
    symbol: string,
    onClick?: () => void,
};

export default function RoundButton({
    colour,
    symbol,
    onClick,
}: RoundButtonProps) {
    const colourStyles = {
        red: "bg-red-500 hover:bg-red-400 active:bg-red-600",
        green: "bg-green-500 hover:bg-green-400 active:bg-green-600",
    }[colour] || "bg-gray-500 hover:bg-gray-400 active:bg-gray-600";

    return <button
        className={`w-16 h-16 flex items-center justify-center text-white rounded-full cursor-pointer transition ease-in-out ${colourStyles}`}
        onClick={onClick}
    >
        <span
            className="material-symbols-outlined"
            style={{ fontSize: "32px" }}
        >
            {symbol}
        </span>
    </button>;
}