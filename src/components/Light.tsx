export type LightProps = {
  state: 'green' | 'yellow' | 'red';
};

const COLOR_CLASSES: Record<LightProps['state'], string> = {
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
};

export function Light({ state }: LightProps) {
  const dot = 'w-3 h-3 rounded-full';

  const getColorClass = (color: LightProps['state']) => {
    const bg = COLOR_CLASSES[color];
    const opacity = state === color ? 'opacity-100' : 'opacity-30';

    return `${dot} ${bg} ${opacity}`;
  };

  return (
    <div className="flex items-center gap-1">
      <div className={getColorClass('red')} />
      <div className={getColorClass('yellow')} />
      <div className={getColorClass('green')} />
    </div>
  );
}
