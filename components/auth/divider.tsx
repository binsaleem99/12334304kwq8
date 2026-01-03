export function AuthDivider() {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-3 border-black/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-sm font-black text-content-muted">أو</span>
      </div>
    </div>
  );
}
