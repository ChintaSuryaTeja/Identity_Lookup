import React from 'react';
import './ResultPage.css';

const ResultPage = () => {
  // Mock data for demonstration
  const resultData = {
    name: "A B C",
    age: "32",
    gender: "Male",
    address: "woxsen university, kamkole",
    email: "abc@example.com",
    phone: "+1 (555) 123-4567",
    socialMedia: [
      { platform: "Facebook", url: "facebook.com/johndoe" },
      { platform: "Twitter", url: "twitter.com/johndoe" },
      { platform: "LinkedIn", url: "linkedin.com/in/johndoe" }
    ],
    additionalInfo: {
      education: "Bachelor's in Computer Science",
      occupation: "Software Engineer",
      interests: ["Hiking", "Photography", "Reading"]
    }
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>Your Profile</h1>
        <p className="search-query">Profile of <span> ABC</span></p>
      </div>
      
      <div className="result-content">
        <div className="result-card">
          <div className="profile-section">
            <div className="profile-image">
              <div className="image-placeholder">
                <span>Profile Photo</span>
              </div>
            </div>
            <div className="profile-details">
              <h2>{resultData.name}</h2>
              <div className="detail-row">
                <span className="label">Age:</span>
                <span>{resultData.age} years</span>
              </div>
              <div className="detail-row">
                <span className="label">Gender:</span>
                <span>{resultData.gender}</span>
              </div>
              <div className="detail-row">
                <span className="label">Location:</span>
                <span>{resultData.address}</span>
              </div>
            </div>
          </div>
          
          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span>{resultData.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone:</span>
              <span>{resultData.phone}</span>
            </div>
            
            <div className="social-media">
              <h4>Social Media</h4>
              <div className="social-links">
                {resultData.socialMedia.map((social, index) => (
                  <a key={index} href={`https://${social.url}`} target="_blank" rel="noopener noreferrer" className="social-link">
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="additional-info">
            <h3>Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Education</span>
                <p>{resultData.additionalInfo.education}</p>
              </div>
              <div className="info-item">
                <span className="label">Occupation</span>
                <p>{resultData.additionalInfo.occupation}</p>
              </div>
              <div className="info-item">
                <span className="label">Interests</span>
                <div className="tags">
                  {resultData.additionalInfo.interests.map((interest, index) => (
                    <span key={index} className="tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn primary">Save to Contacts</button>
            <button className="btn secondary">Export as PDF</button>
            <button className="btn text">Back to Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
