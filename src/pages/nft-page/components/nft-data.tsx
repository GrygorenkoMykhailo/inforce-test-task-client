
interface NftDataProps {
  label: string;
  isFetching: boolean;
  data: unknown;
}

function capitalize(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function NftData({ label, isFetching, data }: NftDataProps) {
  return (
    <div>
      <h3 className="text-xl font-bold">{capitalize(label)} data</h3>
      {isFetching && <div>Loading {label}...</div>}
      {data ? (
        <pre className="text-sm bg-gray-100 p-2 mt-2 overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : "No data yet"}
    </div>
  )
}