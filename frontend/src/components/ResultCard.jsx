import React from 'react';

const ResultCard = ({ name, confidence, isActive = false, onClick, lastSeen = 'Recently' }) => {
  // Generate a consistent color based on the name
  const stringToHslColor = (str, s = 70, l = 60) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  // Get initials from name for avatar
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 90) return '#43b581'; // Green for high confidence
    if (conf >= 75) return '#faa61a'; // Yellow for medium confidence
    return '#f04747'; // Red for low confidence
  };

  const getConfidenceLabel = (conf) => {
    if (conf >= 90) return 'High';
    if (conf >= 75) return 'Medium';
    return 'Low';
  };

  const bgColor = stringToHslColor(name);
  const isOnline = Math.random() > 0.3; // 70% chance of being online

  return (
    <div 
      className={`discord-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="relative mb-3">
        <div 
          className="discord-avatar mx-auto" 
          style={{ backgroundColor: bgColor }}
        >
          {getInitials(name)}
        </div>
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-discord-bg-secondary"></div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="discord-username font-semibold text-white text-lg">
          {name}
        </h3>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span 
            className="discord-confidence text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: getConfidenceColor(confidence) }}
          >
            {getConfidenceLabel(confidence)} Confidence
          </span>
        </div>
        <p className="text-xs text-discord-text-muted">
          {lastSeen}
        </p>
        <div className="mt-3 pt-3 border-t border-discord-border">
          <span className="text-xs text-discord-text-muted">
            Match: <span className="font-semibold text-white">{confidence}%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
