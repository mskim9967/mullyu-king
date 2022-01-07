import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

export function EditCategoryModal({ modalOn, setModalOn, category }) {
  const [name, setName] = useState();

  useEffect(() => {
    if (modalOn) setName(category.name);
  }, [modalOn]);

  return (
    <Modal open={modalOn} onClose={() => setModalOn(false)}>
      <div style={styles.modal}>
        <div style={styles.textHeader}>카테고리 이름 변경</div>
        <TextField onChange label='변경할 이름' variant='filled' size='small' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={async () => {
            if (!name) return;
            setModalOn(false);
            await axiosInstance.patch(`/categories/${category.id}/rename`, {
              name,
            });

            setName('');
          }}
          size='large'
          variant='contained'
          sx={{ marginTop: 3 }}
          startIcon={<SaveIcon />}
        >
          변경
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
    aligncategorys: 'center',
  },

  textHeader: {
    fontWeight: 700,
    fontSize: 23,
    marginBottom: 20,
  },
};
