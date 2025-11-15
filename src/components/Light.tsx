export type LightProps = {
  state: 'green' | 'yellow' | 'red';
};

export function Light({ state }: LightProps) {
  const dot = 'w-3 h-3 rounded-full';

  const getColorClass = (color: LightProps['state'], variant: string) => {
    return state === color
      ? `bg-${color}-${variant} opacity-100`
      : `bg-${color}-${variant} opacity-30`;
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`${dot} ${getColorClass('red', '500')}`} />
      <div className={`${dot} ${getColorClass('yellow', '400')}`} />
      <div className={`${dot} ${getColorClass('green', '500')}`} />
    </div>
  );
}
