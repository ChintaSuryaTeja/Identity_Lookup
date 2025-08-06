import React, { useState } from 'react';
import './photoUpload.css'

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ name: '', file: '' });

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

      // Reset
      setName('');
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="form-container">
  <div class="form-group">
    <label class="form-label">Name</label>
    <input
      type="text"
      value={name}
      onChange={handleNameChange}
      class="form-input"
    />
    {errors.name && <p class="error-text">{errors.name}</p>}
  </div>

  <div
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}
    class="drop-zone"
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
      class="file-input-hidden"
      id="fileInput"
    />
    <label for="fileInput" class="file-label">
      Choose File
    </label>
    {errors.file && <p class="error-text">{errors.file}</p>}
  </div>

  <button type="submit" class="submit-button">
    Upload
  </button>
</form>
  );
};

export default PhotoUpload;
