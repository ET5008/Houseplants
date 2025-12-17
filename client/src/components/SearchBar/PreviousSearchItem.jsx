// Individual previous search item component
const PreviousSearchItem = ({ term, timestamp, onClick, isMatched = false }) => {
  // Format relative time ("2h ago", "Just now", etc.)
  const formatRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleClick = () => {
    onClick(term);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClick(term);
    }
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="option"
      tabIndex={0}
      aria-label={`Previous search: ${term}`}
    >
      {/* Clock icon */}
      <svg
        className="w-4 h-4 text-gray-400 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Search term */}
      <span
        className={`flex-1 text-sm ${
          isMatched ? 'text-green-600 font-medium' : 'text-gray-700'
        }`}
      >
        {term}
      </span>

      {/* Relative time */}
      <span className="text-xs text-gray-400">
        {formatRelativeTime(timestamp)}
      </span>
    </div>
  );
};

export default PreviousSearchItem;
