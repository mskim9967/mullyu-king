import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export function EditImageModal({ modalOn, setModalOn, item }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    // if (modalOn) {
    //   setName(item.name);
    //   setDescription(item.description);
    //   setPrice(item.price);
    //   setCategoryId(item.category.id);
    //   setPrimaryImgKey(item.primaryImg?.key);
    // }
  }, [modalOn]);

  return (
    <Modal open={modalOn} onClose={() => setModalOn(false)}>
      <div style={styles.modal}>
        <div style={styles.textHeader}>이미지 삭제</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center', width: '95%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', gap: 8, height: 75, overflow: 'auto' }}>
              {item?.imgs.map((image) => {
                return (
                  <div
                    style={{ width: 70, height: 70, position: 'relative' }}
                    onClick={async () => {
                      let conf = window.confirm(`정말로 해당 이미지를 삭제하시겠습니까?`);
                      if (conf) await axiosInstance.delete(`/items/${item.id}`);
                    }}
                  >
                    <img
                      style={{
                        width: 70,
                        height: '100%',
                        objectFit: 'cover',
                        ...(item.primaryImg?.key === image.key ? { opacity: 1, border: 'solid red 2px' } : { opacity: 1 }),
                      }}
                      src={`${axiosInstance.defaults.baseURL}/static/${image.key}`}
                    ></img>
                    {item.primaryImg?.key === image.key && (
                      <div style={{ position: 'absolute', top: 0, left: 0, background: 'red', padding: 1, fontSize: 13, fontWeight: 700 }}>대표</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Button
          onClick={async () => {
            setModalOn(false);
          }}
          size='large'
          variant='contained'
          sx={{ marginTop: 3 }}
        >
          닫기
        </Button>
      </div>
    </Modal>
  );
}

const styles = {
  modal: {
    position: 'absolute',
    width: '70%',
    maxWidth: 380,
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
