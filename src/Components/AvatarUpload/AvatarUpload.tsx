import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { AvatarEditModal } from '../AvatarEditModal/AvatarEditModal';
import './AvatarUpload.scss';

interface AvatarUploadProps {
  onAvatarChange: (file: File) => void;
  error?: string;
  initialImage?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  onAvatarChange,
  error,
  initialImage
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);

  const handleAvatarSave = (file: File) => {
    onAvatarChange(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="avatar-upload-container">
      <span>Profile Picture:</span>
      <div className="avatar-upload">
        <Box
          onClick={() => setIsModalOpen(true)}
          sx={{
            width: 200,
            height: 200,
            border: '2px dashed #ccc',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            '&:hover': {
              borderColor: '#999',
              '& .MuiSvgIcon-root': {
                color: '#999'
              }
            }
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <AddAPhotoIcon sx={{ fontSize: 40, color: '#666' }} />
          )}
        </Box>

        <AvatarEditModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAvatarSave}
          initialImage={previewUrl || undefined}
        />

        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};
