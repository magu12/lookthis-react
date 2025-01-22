import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { 
  Modal, 
  Box, 
  Button, 
  Slider, 
  Typography,
  IconButton
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

interface AvatarEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
  initialImage?: string;
}

export const AvatarEditModal: React.FC<AvatarEditModalProps> = ({
  open,
  onClose,
  onSave,
  initialImage
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleScale = (event: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "avatar.png", { type: "image/png" });
          onSave(file);
          onClose();
        }
      }, 'image/png');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="avatar-edit-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Edit Profile Picture</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleNewImage}
          style={{ display: 'none' }}
        />

        <Box sx={{
          width: 300,
          height: 300,
          border: '2px dashed #5C4033',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          mb: 2
        }} onClick={triggerFileInput}>
          {image ? (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={300}
              height={300}
              border={0}
              borderRadius={150}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
          ) : (
            <AddAPhotoIcon sx={{ fontSize: 60, color: '#5C4033' }} />
          )}
        </Box>

        {image && (
          <>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography gutterBottom>Zoom</Typography>
              <Slider
                value={scale}
                min={1}
                max={3}
                step={0.1}
                onChange={handleScale}
                aria-labelledby="zoom-slider"
                sx={{
                  color: '#5C4033'
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button 
              onClick={onClose}
                sx={{
                  border: '1px solid transparent',
                  color: '#5C4033',
                  '&:hover': {
                    border: '1px solid #5C4033',
                  }
                }}
              >Cancel</Button>
              <Button 
              variant="contained" 
              onClick={handleSave}
                sx={{
                  backgroundColor: '#5C4033',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#5C4033',
                  }
                }}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}; 