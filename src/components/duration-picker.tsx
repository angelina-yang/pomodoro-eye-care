"use client";

interface DurationPickerProps {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  onChangeWork: (m: number) => void;
  onChangeBreak: (m: number) => void;
  onChangeLongBreak: (m: number) => void;
  disabled: boolean;
}

function PillGroup({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <div className="flex gap-1.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
            style={{
              background: value === opt ? "var(--pill-active-bg)" : "var(--pill-bg)",
              color: value === opt ? "var(--pill-active-text)" : "var(--pill-text)",
            }}
          >
            {opt}m
          </button>
        ))}
      </div>
    </div>
  );
}

export function DurationPicker({
  workMinutes,
  breakMinutes,
  longBreakMinutes,
  onChangeWork,
  onChangeBreak,
  onChangeLongBreak,
  disabled,
}: DurationPickerProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <PillGroup
        label="Focus"
        options={[15, 25, 30, 45, 60]}
        value={workMinutes}
        onChange={onChangeWork}
        disabled={disabled}
      />
      <PillGroup
        label="Break"
        options={[5, 10, 15]}
        value={breakMinutes}
        onChange={onChangeBreak}
        disabled={disabled}
      />
      <PillGroup
        label="Long Break"
        options={[15, 20, 30]}
        value={longBreakMinutes}
        onChange={onChangeLongBreak}
        disabled={disabled}
      />
    </div>
  );
}
