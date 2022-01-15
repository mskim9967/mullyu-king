import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from './axios-instance';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CreateCategoryModal } from './CreateCategoryModal';
import { EditCategoryModal } from './EditCategoryModal';

export function CategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const [reload, reloadTrigger] = useState(false);

  const [createCategoryModalOn, setCreateCategoryModal] = useState(false);
  const [editCategoryModalOn, setEditCategoryModal] = useState(false);

  useEffect(() => {
    reloadTrigger(!reload);
  }, [createCategoryModalOn, editCategoryModalOn]);

  useEffect(async () => {
    const categoriesRes = await axiosInstance.get('/categories/item');
    setCategories(categoriesRes.data);
  }, [reload]);

  return (
    <>
      <div style={styles.cardList}>
        {categories.map((category, i) => {
          return (
            <div style={styles.card}>
              <div style={{ flex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 25, fontWeight: 600, marginBottom: 3 }}>{category.name}</div>
                <div style={{ fontSize: 13 }}>상품개수: {category.items.length}</div>
              </div>
              <IconButton
                style={{ flex: 1 }}
                onClick={() => {
                  setCategory(category);
                  setEditCategoryModal(true);
                }}
              >
                <EditIcon color='primary' fontSize='medium' />
              </IconButton>
              <IconButton
                style={{ flex: 1.6 }}
                onClick={async () => {
                  if (category.items.length !== 0) alert('카테고리에 속한 상품이 없어야 삭제가 가능합니다');
                  else {
                    let conf = window.confirm(`정말로 ${category.name} 카테고리를 삭제하시겠습니까?`);
                    if (conf) await axiosInstance.delete(`/categories/${category.id}`);
                    reloadTrigger(!reload);
                  }
                }}
              >
                <DeleteForeverIcon color='error' fontSize='medium' />
              </IconButton>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <IconButton
                  onClick={async () => {
                    if (i === 0) return;
                    await axiosInstance.patch(`/categories/swap/`, { category1Id: category.id, category2Id: categories[i - 1].id });
                    reloadTrigger(!reload);
                  }}
                >
                  <KeyboardArrowUpIcon color='primary' fontSize='medium' />
                </IconButton>
                <IconButton
                  onClick={async () => {
                    if (i === categories.length - 1) return;
                    await axiosInstance.patch(`/categories/swap/`, { category1Id: category.id, category2Id: categories[i + 1].id });
                    reloadTrigger(!reload);
                  }}
                >
                  <KeyboardArrowDownIcon color='primary' fontSize='medium' />
                </IconButton>
              </div>
            </div>
          );
        })}

        <Button
          onClick={() => setCreateCategoryModal(true)}
          sx={{ marginTop: 3 }}
          size='large'
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
        >
          카테고리 추가
        </Button>
      </div>
      <CreateCategoryModal modalOn={createCategoryModalOn} setModalOn={setCreateCategoryModal} />
      <EditCategoryModal category={category} modalOn={editCategoryModalOn} setModalOn={setEditCategoryModal} />
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
    height: 100,
    width: '94%',
    borderBottom: 'solid #dddddd 1px',
    display: 'flex',
    alignItems: 'center',
  },
};
