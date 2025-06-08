export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 bg-gray-100 animate-pulse" />
      <div className="flex-1 bg-gray-50 animate-pulse" />
    </div>
  )
}
