import logoSrc from './logo_m.png';
import deliverySrc from './delivery.gif';
import { MdTravelExplore } from 'react-icons/md';
import { IoLogoGooglePlaystore, IoLogoAppleAppstore } from 'react-icons/io5';
import './index.css';

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: window.innerHeight, overflow: 'hidden' }}>
      <img
        className='truck'
        style={{ position: 'absolute', bottom: -24, width: '100%', marginBottom: 20, zIndex: -100, opacity: 0.5 }}
        src={deliverySrc}
      />
      <div style={{ display: 'grid', height: '100%', gridTemplateRows: '1fr 0' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -40,
          }}
        >
          <img className='logo' style={{ width: '63%', maxWidth: 440, marginBottom: 20 }} src={logoSrc} />
          <div className='text' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ fontWeight: '500', fontSize: 20, color: '#555555', marginTop: -10 }}>대한민국 No.1</div>
            <div style={{ fontWeight: '700', fontSize: 40, color: '#222222', marginBottom: 30 }}></div>
          </div>
          <div
            className='web'
            style={{
              width: 260,
              height: 58,
              backgroundColor: '#FF8D30',
              borderRadius: 18,
              boxShadow: '3px 3px 3px #B86623',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              window.location.href = 'https://xn--9v2bp8at11b.com/';
            }}
          >
            <MdTravelExplore style={{ fontSize: 27, color: 'white', marginRight: 10 }} />
            <div style={{ fontWeight: '600', fontSize: 20, color: 'white' }}>웹 브라우저</div>
            <div style={{ fontWeight: '400', fontSize: 20, color: 'white' }}>로 접속</div>
          </div>

          <div
            className='android'
            style={{
              marginTop: 15,
              width: 260,
              height: 58,
              backgroundColor: '#02AA78',
              borderRadius: 18,
              boxShadow: '3px 3px 3px #005139',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              alert('준비 중 입니다!');
            }}
          >
            <IoLogoGooglePlaystore style={{ fontSize: 27, color: 'white', marginRight: 10 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: 20, color: 'white', display: 'inline' }}>Play Store</div>
                <div style={{ fontWeight: '400', fontSize: 20, color: 'white', display: 'inline' }}>에서 설치</div>
              </div>
              <div style={{ fontWeight: '200', fontSize: 15, color: 'white', marginTop: -3 }}>(Andriod)</div>
            </div>
          </div>

          <div
            className='ios'
            style={{
              marginTop: 15,
              width: 260,
              height: 58,
              backgroundColor: '#1985FF',
              borderRadius: 18,
              boxShadow: '3px 3px 3px #0F519B',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              alert('준비 중 입니다!');
            }}
          >
            <IoLogoAppleAppstore style={{ fontSize: 27, color: 'white', marginRight: 10 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: 20, color: 'white', display: 'inline' }}>App Store</div>
                <div style={{ fontWeight: '400', fontSize: 20, color: 'white', display: 'inline' }}>에서 설치</div>
              </div>
              <div style={{ fontWeight: '200', fontSize: 15, color: 'white', marginTop: -3 }}> (iOS)</div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'red' }}></div>
      </div>
    </div>
  );
}

export default App;
