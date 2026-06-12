export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/10 border-t-aurora-blue rounded-full animate-spin" />
      <span className="sr-only">Loading Jericho Wallet...</span>
    </div>
  );
}
