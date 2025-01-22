import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AvatarUpload } from "../../Components/AvatarUpload/AvatarUpload";
import { Button } from "../../Components/Button/Button";
import { usersApi } from "../../api/users";
import { useAlert } from "../../contexts/AlertContext";
import "./Settings.scss";

export const Settings = () => {
  const { showAlert } = useAlert();
  const { user, isLoading } = useAuth();
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <h1 className="error">Unable to load user data</h1>;
  }

  const handleAvatarChange = (file: File) => {
    setNewAvatar(file);
  };

  const handleSaveAvatar = async () => {
    if (newAvatar) {
      try {
        const formData = new FormData();
        formData.append('avatar', newAvatar);
        
        await usersApi.updateProfile(formData);
        setNewAvatar(null);
        showAlert('Avatar updated successfully', 'success');
      } catch (error) {
        showAlert('Failed to update avatar', 'error');
        console.error('Failed to update avatar:', error);
      }
    }
  };

  return (
    <main className="settings-page">
      <div className="wrap">
        <h1>Account Settings</h1>
        <div className="settings-avatar-section">
          <AvatarUpload
            onAvatarChange={handleAvatarChange}
            initialImage={user.avatar_url}
          />
          {newAvatar && (
            <Button
              onClick={handleSaveAvatar}
            >
              Save New Avatar
            </Button>
          )}
        </div>
        <div className="user-info">
          <div className="info-item">
            <label>Username</label>
            <p>{user.username}</p>
          </div>

          <div className="info-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="info-item">
            <label>Registration Date</label>
            <p>{new Date(user.registration_date).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
