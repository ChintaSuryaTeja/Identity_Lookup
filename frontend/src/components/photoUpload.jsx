import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './photoUpload.css';
import HistorySidebar from './HistorySidebar';

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ name: '', file: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (f) => {
    if (!f) return setErrors(prev => ({ ...prev, file: 'Please upload a file.' }));
    if (!f.type.startsWith('image/')) return setErrors(prev => ({ ...prev, file: 'Only image files allowed.' }));

    setFile(f);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: value.trim() === '' ? 'Name is required.' : '' }));
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Name is required.' }));
      valid = false;
    }

    if (!file) {
      setErrors(prev => ({ ...prev, file: 'File is required.' }));
      valid = false;
    }

    if (valid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', file);

      console.log('Submitting:', name, file);
      // Send formData to backend here...

      // Navigate to results page
      navigate('/results');
      
      // Reset form
      // setName('');
      // setFile(null);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectHistory = (item) => {
    // Handle history item selection
    console.log('Selected history item:', item);
  };

  return (
    <div className="app-container">
      <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        ☰
      </button>
      
      <HistorySidebar 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        history={searchHistory}
        onSelectHistory={handleSelectHistory}
      />
      
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="form-input"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="drop-zone"
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag & drop an image here, or click to select one.</p>
            )}
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              className="file-input-hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-label">
              Choose File
            </label>
            {errors.file && <p className="error-text">{errors.file}</p>}
          </div>

          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoUpload;
