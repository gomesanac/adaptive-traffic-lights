export type LightProps = {
  state: "green" | "yellow" | "red"
}

export function Light({ state }: LightProps) {
  const dot = 'w-3 h-3 rounded-full opacity-30';

  return (
    <div className="flex items-center gap-1">
      <div
        className={`${dot} ${
          state === 'red' ? 'bg-red-500 opacity-100' : 'bg-red-500'
        }`}
      />
      <div
        className={`${dot} ${
          state === 'yellow' ? 'bg-yellow-400 opacity-100' : 'bg-yellow-400'
        }`}
      />
      <div
        className={`${dot} ${
          state === 'green' ? 'bg-green-500 opacity-100' : 'bg-green-500'
        }`}
      />
    </div>
  );
}
