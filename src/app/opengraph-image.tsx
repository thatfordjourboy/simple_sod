import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Steam-Off Daycation 2025 - Ghana\'s Premier House Party';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial',
          color: 'white',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background overlay with reduced opacity */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://steamoff.vercel.app/ghana-house-party.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              margin: 0,
              marginBottom: 20,
              background: 'linear-gradient(to right, #ff9500, #ff0000)',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              padding: '0 20px',
            }}
          >
            STEAM-OFF DAYCATION
          </h1>
          
          <h2
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              margin: 0,
              marginBottom: 30,
              color: '#ff9500',
            }}
          >
            2025
          </h2>
          
          <p
            style={{
              fontSize: 32,
              margin: 0,
              marginBottom: 40,
              maxWidth: 800,
              textAlign: 'center',
            }}
          >
            Ghana's Premier House Party for MSc Business Analytics
          </p>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '12px 30px',
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 24, margin: 0 }}>
              Register Now at steamoff.vercel.app
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 