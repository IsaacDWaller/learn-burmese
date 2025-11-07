import { Toggle } from "@base-ui-components/react";

export default function LanguageToggle({
    enabled,
    position,
    text,
}: Readonly<{ enabled: boolean; position: string; text: string; }>) {
    return <Toggle
        className={`px-4 py-2 ${enabled ? "bg-teal-500 hover:bg-teal-600 text-slate-50" : "bg-slate-50 hover:bg-slate-200 text-slate-950"} rounded-${position}-sm cursor-pointer select-none transition-all ease-in-out`}
        value={text}
    >
        {text}
    </Toggle>;
}