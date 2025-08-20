import React, { useState, useEffect } from "react";
import { Upload, Send, Search, User, Settings, Plus, Image as ImageIcon } from "lucide-react";
import ResultCard from "./ResultCard.jsx";
import "../styles/discord.css";

// Mock data (later replace with API results)
const mockResults = [
  { id: 1, name: "John Doe", confidence: 89, lastSeen: "2 hours ago", image: null },
  { id: 2, name: "Jane Smith", confidence: 92, lastSeen: "1 hour ago", image: null },
  { id: 3, name: "Michael Lee", confidence: 85, lastSeen: "5 hours ago", image: null },
  { id: 4, name: "Emily Davis", confidence: 90, lastSeen: "30 minutes ago", image: null },
  { id: 5, name: "David Brown", confidence: 88, lastSeen: "1 day ago", image: null },
  { id: 6, name: "Sophia Wilson", confidence: 87, lastSeen: "3 hours ago", image: null },
  { id: 7, name: "Alex Johnson", confidence: 91, lastSeen: "Just now", image: null },
  { id: 8, name: "Sarah Williams", confidence: 84, lastSeen: "12 hours ago", image: null },
];

const Recognition = ({ results = mockResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isUploading, setIsUploading] = useState(false);

  // Filter results based on search query and selected filter
  const filteredResults = results.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "high") return matchesSearch && user.confidence >= 90;
    if (selectedFilter === "medium") return matchesSearch && user.confidence >= 75 && user.confidence < 90;
    if (selectedFilter === "low") return matchesSearch && user.confidence < 75;
    
    return matchesSearch;
  });

  // Auto-select first user if none selected and there are results
  useEffect(() => {
    if (filteredResults.length > 0 && !selectedUser) {
      setSelectedUser(filteredResults[0].id);
    }
  }, [filteredResults, selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user.id);
  };

  const handleSendMessage = () => {
    if (inputText.trim() && selectedUser) {
      const selectedUserData = results.find(u => u.id === selectedUser);
      console.log(`Message to ${selectedUserData.name}: ${inputText}`);
      setInputText("");
      // Here you would typically send the message to your backend
    }
  };

  const handleUploadClick = () => {
    // Trigger file input click
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
          console.log('Uploaded file:', file.name);
          setIsUploading(false);
          // Here you would typically handle the file upload
        }, 1500);
      }
    };
    fileInput.click();
  };

  const selectedUserData = selectedUser ? results.find(u => u.id === selectedUser) : null;

  return (
    <div className="discord-container">
      {/* Sidebar */}
      <div className="discord-sidebar">
        <div className="p-4 border-b border-discord-border">
          <h2 className="text-lg font-semibold text-white mb-4">Identity Lookup</h2>
          
          <div className="space-y-2">
            <button 
              className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 text-sm ${
                selectedFilter === 'all' ? 'bg-discord-accent text-white' : 'text-discord-text hover:bg-discord-message-hover'
              }`}
              onClick={() => setSelectedFilter('all')}
            >
              <User className="h-4 w-4" />
              <span>All Matches</span>
            </button>
            
            <button 
              className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 text-sm ${
                selectedFilter === 'high' ? 'bg-discord-accent text-white' : 'text-discord-text hover:bg-discord-message-hover'
              }`}
              onClick={() => setSelectedFilter('high')}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>High Confidence</span>
            </button>
            
            <button 
              className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 text-sm ${
                selectedFilter === 'medium' ? 'bg-discord-accent text-white' : 'text-discord-text hover:bg-discord-message-hover'
              }`}
              onClick={() => setSelectedFilter('medium')}
            >
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span>Medium Confidence</span>
            </button>
            
            <button 
              className={`w-full text-left px-3 py-2 rounded flex items-center space-x-2 text-sm ${
                selectedFilter === 'low' ? 'bg-discord-accent text-white' : 'text-discord-text hover:bg-discord-message-hover'
              }`}
              onClick={() => setSelectedFilter('low')}
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Low Confidence</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <button 
            className="w-full bg-discord-accent hover:bg-discord-accent-hover text-white py-2 px-3 rounded text-sm font-medium flex items-center justify-center space-x-2"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>New Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="discord-main">
        {/* Header */}
        <div className="discord-header flex justify-between items-center px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">
              {selectedFilter === 'all' ? 'All Matches' : 
               selectedFilter === 'high' ? 'High Confidence Matches' :
               selectedFilter === 'medium' ? 'Medium Confidence Matches' : 'Low Confidence Matches'}
            </h1>
            <span className="ml-3 bg-discord-bg-tertiary text-xs text-discord-text-muted px-2 py-1 rounded">
              {filteredResults.length} {filteredResults.length === 1 ? 'match' : 'matches'}
            </span>
          </div>
          
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-discord-text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search matches..."
              className="w-full pl-10 pr-4 py-2 bg-discord-bg-tertiary text-discord-text rounded text-sm focus:outline-none focus:ring-2 focus:ring-discord-accent focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="discord-content">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <ResultCard
                key={item.id}
                name={item.name}
                confidence={item.confidence}
                isActive={selectedUser === item.id}
                onClick={() => handleUserSelect(item)}
                lastSeen={item.lastSeen}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-discord-text-muted p-8 text-center">
              <ImageIcon className="h-16 w-16 mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No matches found</h3>
              <p className="max-w-md">
                {searchQuery 
                  ? "No results match your search criteria. Try adjusting your filters or search term."
                  : "Upload an image to find matching identities or adjust your filter settings."}
              </p>
              <button 
                className="mt-6 bg-discord-accent hover:bg-discord-accent-hover text-white py-2 px-4 rounded text-sm font-medium flex items-center space-x-2"
                onClick={handleUploadClick}
              >
                <Upload className="h-4 w-4" />
                <span>Upload New Image</span>
              </button>
            </div>
          )}
        </div>

        {/* Input Section - Only show when a user is selected */}
        {selectedUserData && (
          <div className="discord-input-container">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-discord-accent flex items-center justify-center text-white font-semibold">
                  {selectedUserData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-discord-bg-secondary"></div>
              </div>
              <div>
                <div className="text-sm font-medium text-white">{selectedUserData.name}</div>
                <div className="text-xs text-discord-text-muted">Confidence: {selectedUserData.confidence}%</div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={`Message ${selectedUserData.name.split(' ')[0] || 'user'}...`}
                className="w-full pl-4 pr-12 py-2 bg-discord-bg-tertiary text-discord-text rounded focus:outline-none focus:ring-2 focus:ring-discord-accent focus:ring-opacity-50"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            
            <button 
              className="discord-send-btn"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              title="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recognition;
