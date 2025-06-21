interface RoundButtonProps {
    colour: string,
    symbol: string,
    onClick: () => void,
};

export default function RoundButton({
    colour,
    symbol,
    onClick,
}: RoundButtonProps) {
    return <button
        className={`w-16 h-16 flex items-center justify-center text-white rounded-full cursor-pointer transition ease-in-out bg-${colour}-500 hover:bg-${colour}-400 active:bg-${colour}-600`}
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