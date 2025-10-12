"use client";

export default function Category({
    icon,
    text,
    enabled,
    handleClick
}: Readonly<{ icon: string; text: string; enabled: boolean; handleClick: (text: string) => void }>) {
    return <button
        className={`flex flex-row items-center gap-2 p-4 bg-slate-50 rounded-lg cursor-pointer select-none ring ${!enabled ? "" : "ring-teal-500"} hover:ring-teal-500 active:ring-teal-700 transition-all ease-in-out`}
        onClick={() => handleClick(text)}
    >
        <span className="material-symbols-outlined text-2xl text-teal-500" style={{ fontSize: "32px" }}>{icon}</span>
        <h3 className="text-lg text-slate-700">{text}</h3>
    </button>;
}