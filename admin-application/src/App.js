import { useState, useEffect, useRef } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CategoryScreen } from './CategoryScreen';
import { ItemScreen } from './ItemScreen';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axiosInstance from './axios-instance';

function App() {
  const [navi, setNavi] = useState('items');
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [isLogin, setLogin] = useState();
  const [reload, reloadTrigger] = useState(false);

  useEffect(async () => {
    try {
      const loginRes = await axiosInstance.post('/auth/test', { timeout: '1000' });
      setLogin(true);
    } catch (e) {
      setLogin(false);
    }
  }, [reload]);

  return (
    <BrowserRouter>
      <div className='App' style={{ width: '100vw', height: window.innerHeight }}>
        {isLogin ? <Redirect to='/' /> : <Redirect to='/login' />}
        <Switch>
          <Route path='/login'>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <TextField label='id' value={id} onChange={(e) => setId(e.target.value)} />
                <TextField label='password' type='password' value={pw} onChange={(e) => setPw(e.target.value)} />
                <Button
                  onClick={async () => {
                    try {
                      const loginRes = await axiosInstance.post('/auth/signin', { username: id, password: pw });
                      localStorage.setItem('Authorization', `Bearer ${loginRes.data.accessToken}`);
                      reloadTrigger(!reload);
                      window.location.reload();
                    } catch (e) {
                      alert('id 혹은 암호가 틀렸습니다');
                    }
                  }}
                  size='large'
                  variant='contained'
                >
                  로그인
                </Button>
              </div>
            </div>
          </Route>
          <Route path='/'>
            <div style={{ display: 'grid', width: '100vw', height: '100vh', gridTemplateRows: '1fr 50px' }}>
              <div style={styles.content}>
                {navi === 'categories' && <CategoryScreen />}
                {navi === 'items' && <ItemScreen />}
              </div>
              <div style={{}}>
                <BottomNavigation
                  showLabels
                  value={navi}
                  onChange={(event, newValue) => {
                    setNavi(newValue);
                  }}
                  sx={{ backgroundColor: '#e0e0e0', height: '100%' }}
                >
                  <BottomNavigationAction label='카테고리' value='categories' />
                  <BottomNavigationAction label='상품' value='items' />
                  <Button
                    onClick={() => {
                      localStorage.removeItem('Authorization');
                      reloadTrigger(!reload);
                      window.location.reload();
                    }}
                    size='large'
                    variant='contained'
                  >
                    로그아웃
                  </Button>
                </BottomNavigation>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  content: { overflow: 'auto', background: '#ffffff', padding: 20 },
};

export default App;
