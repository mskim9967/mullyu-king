import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import imageCompression from 'browser-image-compression';

export function CreateItemModal({ modalOn, setModalOn, categories }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  const [image, setImage] = useState();

  return (
    <Modal open={modalOn} onClose={() => setModalOn(false)}>
      <div style={styles.modal}>
        <div style={styles.textHeader}>상품 추가</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <TextField label='상품 이름' variant='filled' size='small' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label='상품 설명' variant='filled' size='small' fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField
            label='가격'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            variant='filled'
            size='small'
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>카테고리</InputLabel>
            <Select value={categoryId} label='카테고리' size='small' variant='filled' onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((category) => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <form encType='multipart/form-data'>
            <input
              type='file'
              accept='image/*'
              name='profile_img'
              placeholder='업로드'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            ></input>
          </form>
        </div>
        <Button
          onClick={async () => {
            if (!name || !image) return;
            const formData = new FormData();
            formData.append(
              'image',
              await imageCompression(image, {
                maxSizeMB: 2,
                maxWidthOrHeight: 1000,
              })
            );
            let itemId = (
              await axiosInstance.post('/items', {
                name,
                description,
                price,
                categoryId,
              })
            ).data.id;
            await axiosInstance.post(`/static/item/${itemId}`, formData);

            setModalOn(false);
            setName('');
            setDescription('');
            setPrice('');
            setCategoryId('');
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
