
interface Props {
  label: string;
  onClick: () => void;
  color?: 'blue' | 'green';
}

export function Button({ label, onClick, color = 'blue' }: Props) {
  const base = 'text-white px-4 py-2 rounded cursor-pointer';
  const classes = {
    blue: 'bg-blue-500',
    green: 'bg-green-600',
  };
  return (
    <button onClick={onClick} className={`${classes[color]} ${base}`}>
      {label}
    </button>
  );
}