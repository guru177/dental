import React, { useState } from 'react';
import { Pencil, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="profile-settings-page">
      <div className="settings-header">
        <h2>My Settings</h2>
      </div>

      <div className="profile-settings-grid">
        {/* Left Card: Profile Details */}
        <div className="prof-card">
          <div className="prof-card-header">
            <div className="prof-avatar-group">
              <div className="prof-avatar-lg">
                <img src="https://img.freepik.com/premium-vector/doctor-profile-icon-medical-physician-logo-concept_123447-1282.jpg" alt="Guru" />
              </div>
              <h3>Guru</h3>
            </div>
            <button className="prof-btn-outline">
              Upload Profile <Pencil size={14} />
            </button>
          </div>

          <div className="prof-details-grid">
            <div className="prof-detail-item">
              <label>Role</label>
              <p>Doctor</p>
            </div>
            <div className="prof-detail-item">
              <label>Department</label>
              <p>Chief Dental Surgeon</p>
            </div>
            <div className="prof-detail-item">
              <label>Phone</label>
              <p>+916282390631</p>
            </div>
            <div className="prof-detail-item">
              <label>Location</label>
              <p>Aikaranad North</p>
            </div>
            <div className="prof-detail-item full-width">
              <label>Email</label>
              <p>guruprasad6282@gmail.com</p>
            </div>
          </div>

          <div className="prof-card-footer">
            <button className="prof-btn-outline">
              <FileText size={16} /> Upload Signature / Stamp
            </button>
          </div>
        </div>

        {/* Right Card: Password */}
        <div className="prof-card">
          <div className="prof-pass-header">
            <div className="lock-icon-box">
              <Lock size={20} color="#94a3b8" />
            </div>
            <div className="prof-pass-titles">
              <h3>Password</h3>
              <p>Reset or change your password</p>
            </div>
          </div>

          <div className="prof-pass-form">
            <div className="form-group-pass">
              <label>Old Password</label>
              <div className="pass-input-wrapper">
                <input 
                  type={showOldPassword ? "text" : "password"} 
                  placeholder="Enter your old password" 
                />
                <button 
                  className="eye-toggle" 
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group-pass">
              <label>New Password</label>
              <div className="pass-input-wrapper">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  placeholder="Enter new password" 
                />
                <button 
                  className="eye-toggle" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="prof-pass-actions">
              <button className="prof-btn-primary">Reset Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
