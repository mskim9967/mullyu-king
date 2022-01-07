import { useState, useEffect, useRef } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CategoryScreen } from './CategoryScreen';
import { ItemScreen } from './ItemScreen';

function App() {
  const [navi, setNavi] = useState('items');

  return (
    <div className='App' style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', bottom: 0, width: '100vw', zIndex: 100 }}>
        <BottomNavigation
          showLabels
          value={navi}
          onChange={(event, newValue) => {
            setNavi(newValue);
          }}
          sx={{ backgroundColor: '#e0e0e0' }}
        >
          <BottomNavigationAction label='카테고리' value='categories' />
          <BottomNavigationAction label='상품' value='items' />
        </BottomNavigation>
      </div>

      <div style={styles.content}>
        <div style={{ padding: 20, paddingBottom: 100 }}>
          {navi === 'categories' && <CategoryScreen />}
          {navi === 'items' && <ItemScreen />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  content: { height: '100%', overflow: 'auto', background: '#ffffff' },
};

export default App;
