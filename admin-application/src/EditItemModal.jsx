import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EditImageModal } from './EditImageModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import imageCompression from 'browser-image-compression';

export function EditItemModal({ modalOn, setModalOn, itemId, categories }) {
  const [item, setItem] = useState();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  const [primaryImgKey, setPrimaryImgKey] = useState();
  const [onDiscount, setDiscount] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [image, setImage] = useState();

  const [reload, reloadTrigger] = useState(false);
  const [editImageModal, setEditImageModal] = useState(false);

  useEffect(() => {
    reloadTrigger(!reload);
  }, [editImageModal]);

  useEffect(async () => {
    const itemRes = await axiosInstance.get(`/items/${itemId}`);
    setItem(itemRes.data);
  }, [reload]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setCategoryId(item.category.id);
      setPrimaryImgKey(item.primaryImg?.key);
      setDiscount(item.onDiscount);
      setDiscountPrice(item.discountPrice);
    }
  }, [item]);

  useEffect(async () => {
    if (modalOn) reloadTrigger(!reload);
    else setItem();
  }, [modalOn]);

  return (
    <>
      <Modal open={modalOn && item} onClose={() => setModalOn(false)}>
        <div style={styles.modal}>
          <IconButton sx={{ position: 'absolute', right: 6, top: 6 }} onClick={() => setModalOn(false)}>
            <CloseIcon fontSize='large' />
          </IconButton>
          <div style={styles.textHeader}>상품 정보 수정</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center', width: '95%' }}>
            <TextField onChange label='상품 이름' variant='filled' size='small' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField
              onChange
              label='상품 설명'
              variant='filled'
              size='small'
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              onChange
              label='상품 가격'
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

            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 50, fontWeight: 700, marginRight: -20 }}>할인</div>
              <Checkbox size='small' checked={onDiscount} onChange={(e) => setDiscount(e.target.checked)} />

              <TextField
                fullWidth
                disabled={!onDiscount}
                label='할인 가격'
                variant='filled'
                size='small'
                value={discountPrice}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ display: 'flex', gap: 8, overflow: 'auto' }}>
                {item?.imgs.map((image) => {
                  return (
                    <div style={{ width: 55, height: 90, position: 'relative' }}>
                      <img
                        onClick={async () => {
                          setPrimaryImgKey(image.key);
                          await axiosInstance.patch(`/items/${item.id}`, {
                            primaryImgKey: image.key,
                          });
                          reloadTrigger(reload);
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: 'cover',
                          ...(primaryImgKey === image.key ? { opacity: 1, border: 'solid red 2px' } : { opacity: 0.6 }),
                        }}
                        src={`${axiosInstance.defaults.baseURL}/static/${image.key}`}
                      ></img>
                      {primaryImgKey === image.key && (
                        <div style={{ position: 'absolute', top: 0, left: 0, background: 'red', padding: 1, fontSize: 13, fontWeight: 700 }}>
                          대표
                        </div>
                      )}
                      <IconButton
                        style={{ position: 'absolute', bottom: 0, left: 6 }}
                        onClick={async () => {
                          if (primaryImgKey === image.key) alert('대표이미지는 삭제할 수 없습니다');
                          else {
                            let conf = window.confirm(`정말로 이미지를 삭제하시겠습니까?`);
                            if (conf) await axiosInstance.delete(`/static/${image.key}`);
                            reloadTrigger(!reload);
                          }
                        }}
                      >
                        <DeleteForeverIcon color='error' fontSize='small' />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            </div>
            <form encType='multipart/form-data'>
              <input
                type='file'
                accept='image/*'
                onChange={async (e) => {
                  const formData = new FormData();
                  formData.append(
                    'image',
                    await imageCompression(e.target.files[0], {
                      maxSizeMB: 2,
                      maxWidthOrHeight: 1000,
                    })
                  );
                  const imgRes = await axiosInstance.post(`/static/item/${itemId}`, formData);
                  await axiosInstance.post(`/static/item/thumb/${imgRes.data.key}`, formData);
                  reloadTrigger(!reload);
                }}
              ></input>
            </form>
          </div>

          <Button
            onClick={async () => {
              if (!name || !price || !categoryId || !primaryImgKey) return;

              await axiosInstance.patch(`/items/${item.id}`, {
                name,
                description,
                price,
                categoryId,
                primaryImgKey,
              });
              await axiosInstance.patch(`/items/${item.id}/onDiscount?status=${onDiscount}&price=${discountPrice}`);

              setModalOn(false);
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
      <EditImageModal item={item} modalOn={editImageModal} setModalOn={setEditImageModal} />
    </>
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
