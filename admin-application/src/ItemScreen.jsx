import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

import { CreateItemModal } from './CreateItemModal';
import { EditItemModal } from './EditItemModal';

export function ItemScreen() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsOrigin, setItemsOrigin] = useState([]);
  const [categoryId, setCategoryId] = useState(-1);
  const [item, setItem] = useState();

  const [onSale, setSale] = useState(true);
  const [onNotSale, setNotSale] = useState(true);
  const [onDiscount, setDiscount] = useState(true);
  const [onNotDiscount, setNotDiscount] = useState(true);

  const [reload, reloadTrigger] = useState(false);

  const [createItemModalOn, setCreateItemModal] = useState(false);
  const [editItemModalOn, setEditItemModal] = useState(false);

  useEffect(() => {
    reloadTrigger(!reload);
  }, [createItemModalOn, editItemModalOn]);

  useEffect(async () => {
    const categoriesRes = await axiosInstance.get('/categories/item');
    setCategories(categoriesRes.data);

    const itemRes = await axiosInstance.get('/items');
    setItemsOrigin(itemRes.data);
  }, [reload]);

  useEffect(() => {
    setItems(
      itemsOrigin.filter(
        (e) =>
          (e.category.id === categoryId || categoryId === -1) &&
          (e.onSale & onSale || !e.onSale & onNotSale) &&
          (e.onDiscount & onDiscount || !e.onDiscount & onNotDiscount)
      )
    );
  }, [itemsOrigin, categoryId, onSale, onNotSale, onDiscount, onNotDiscount]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <FormControl sx={{ width: '50%' }} fullWidth>
          <InputLabel>카테고리</InputLabel>
          <Select value={categoryId} label='카테고리' onChange={(e) => setCategoryId(e.target.value)}>
            <MenuItem value={-1}>전체</MenuItem>
            {categories.map((category) => {
              return <MenuItem value={category.id}>{category.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox size='small' checked={onSale} onChange={(e) => setSale(e.target.checked)} />
              <div style={{ fontSize: 13, fontWeight: '600', marginLeft: -7 }}>판매 중</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: -10 }}>
              <Checkbox size='small' checked={onNotSale} onChange={(e) => setNotSale(e.target.checked)} />
              <div style={{ fontSize: 13, fontWeight: '600', marginLeft: -7 }}>판매 중지</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox size='small' checked={onNotDiscount} onChange={(e) => setNotDiscount(e.target.checked)} />
              <div style={{ fontSize: 13, fontWeight: '600', marginLeft: -7 }}>할인 없음</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: -10 }}>
              <Checkbox size='small' checked={onDiscount} onChange={(e) => setDiscount(e.target.checked)} />
              <div style={{ fontSize: 13, fontWeight: '600', marginLeft: -7 }}>할인 중</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.cardList}>
        {items.map((item, i) => {
          return (
            <div style={styles.card}>
              <div
                style={{ position: 'relative', display: 'flex', flex: 4, flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  setItem(item);
                  setEditItemModal(true);
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{item.name}</div>
                <div style={{ fontSize: 12 }}>{item.category.name}</div>
                <div style={{ fontSize: 12, ...(item.onDiscount && { backgroundColor: 'yellow' }) }}>
                  {item.onDiscount ? `(할인) ${item.discountPrice}원 ` : `${item.price}원`}
                </div>
              </div>
              {/* <IconButton
                style={{ flex: 1 }}
                onClick={() => {
                  setItem(item);
                  setEditCategoryModal(true);
                }}
              >
                <EditIcon color='primary' fontSize='medium' />
              </IconButton> */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 13 }}>{item.onSale ? '판매 중' : '판매중지'}</div>
                <Switch
                  color='primary'
                  checked={item.onSale}
                  onChange={async (e) => {
                    await axiosInstance.patch(`/items/${item.id}/onSale?status=${e.target.checked}`);
                    reloadTrigger(!reload);
                  }}
                />
              </div>
              <IconButton
                style={{ flex: 1.2 }}
                onClick={async () => {
                  let conf = window.confirm(`정말로 ${item.name}을(를) 삭제하시겠습니까?`);
                  if (conf) await axiosInstance.delete(`/items/${item.id}`);
                  reloadTrigger(!reload);
                }}
              >
                <DeleteForeverIcon color='error' fontSize='medium' />
              </IconButton>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <IconButton
                  onClick={async () => {
                    if (i === 0) return;
                    await axiosInstance.patch(`/items/swap/`, { item1Id: item.id, item2Id: items[i - 1].id });
                    reloadTrigger(!reload);
                  }}
                >
                  <KeyboardArrowUpIcon color='primary' fontSize='medium' />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    if (i === items.length - 1) return;
                    await axiosInstance.patch(`/items/swap/`, { item1Id: item.id, item2Id: items[i + 1].id });
                    reloadTrigger(!reload);
                  }}
                >
                  <KeyboardArrowDownIcon color='primary' fontSize='medium' />
                </IconButton>
              </div>
            </div>
          );
        })}

        <Button onClick={() => setCreateItemModal(true)} sx={{ marginTop: 3 }} size='large' variant='contained' startIcon={<AddCircleOutlineIcon />}>
          상품 추가
        </Button>
      </div>

      <CreateItemModal categories={categories} modalOn={createItemModalOn} setModalOn={setCreateItemModal} />
      <EditItemModal itemId={item?.id} categories={categories} modalOn={editItemModalOn} setModalOn={setEditItemModal} />
    </>
  );
}

const styles = {
  cardList: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 100,
  },
  card: {
    height: 80,
    width: '98%',
    borderBottom: 'solid #dddddd 1px',
    display: 'flex',
    alignItems: 'center',
  },
};
