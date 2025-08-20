import React from 'react';
import './HistorySidebar.css';

const HistorySidebar = ({ isOpen, toggleSidebar, history, onSelectHistory }) => {
  // Mock history data for now
  const mockHistory = [
    { id: 1, title: 'Search from 2 hours ago' },
    { id: 2, title: 'Search from yesterday' },
    { id: 3, title: 'Search from last week' },
  ];

  const displayHistory = history.length > 0 ? history : mockHistory;

  return (
    <div className={`history-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="new-chat-btn">
          <span>+</span> New Search
        </button>
        <button className="close-sidebar" onClick={toggleSidebar}>
          ×
        </button>
      </div>
      <div className="history-list">
        {displayHistory.map((item) => (
          <div 
            key={item.id} 
            className="history-item"
            onClick={() => onSelectHistory && onSelectHistory(item)}
          >
            <span className="history-icon">🔍</span>
            <span className="history-title">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;
