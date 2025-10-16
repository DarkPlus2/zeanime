export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin border-primary"></div>
    </div>
  );
}
