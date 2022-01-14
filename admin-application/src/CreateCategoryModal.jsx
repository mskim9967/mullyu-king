import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import SaveIcon from '@mui/icons-material/Save';
import { Modal, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function CreateCategoryModal({ modalOn, setModalOn }) {
  const [name, setName] = useState('');

  return (
    <Modal open={modalOn} onClose={() => setModalOn(false)}>
      <div style={styles.modal}>
        <IconButton sx={{ position: 'absolute', right: 6, top: 6 }} onClick={() => setModalOn(false)}>
          <CloseIcon fontSize='large' />
        </IconButton>
        <div style={styles.textHeader}>카테고리 추가</div>
        <TextField onChange label='카테고리 이름' variant='filled' size='small' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={async () => {
            if (!name) return;
            setModalOn(false);
            setName('');
            await axiosInstance.post('/categories/item', {
              name,
            });
          }}
          size='large'
          variant='contained'
          sx={{ marginTop: 3 }}
          startIcon={<SaveIcon />}
        >
          저장
        </Button>
      </div>
    </Modal>
  );
}

const styles = {
  modal: {
    position: 'absolute',
    width: '78%',
    maxWidth: 400,
    background: '#ffffff',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  textHeader: {
    fontWeight: 700,
    fontSize: 23,
    marginBottom: 20,
  },
};
