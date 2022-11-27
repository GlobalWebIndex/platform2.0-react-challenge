type InfoProps = {
  label: string;
  value: string;
};
export function Info({ label, value }: InfoProps) {
  return (
    <div className="flex space-x-2 text-sm">
      <div className="text-gray-500 ">{label}:</div>
      <div className="text-gray-900 ">{value}</div>
    </div>
  );
}
