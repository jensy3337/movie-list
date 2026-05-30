import React from 'react';
import { stickerUrls } from '../data';

export const HeaderDividerRow: React.FC = () => {
  const list = ['bow', 'star', 'heart', 'diamond', 'ribbon', 'bow', 'star', 'heart', 'diamond', 'ribbon'];
  return (
    <div className="sticker-divider" id="divider-row">
      {list.map((st, idx) => {
        const deg = idx % 2 === 0 ? '8deg' : '-8deg';
        return (
          <img
            key={idx}
            src={stickerUrls[st as keyof typeof stickerUrls]}
            className="divider-sticker"
            style={{ transform: `rotate(${deg})` }}
            alt="sweet decor"
            loading="lazy"
            draggable="false"
            onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
          />
        );
      })}
    </div>
  );
};

export const FloatingStickerLayer: React.FC = () => {
  const positions = [
    { top: '3%', left: '2%', sticker: 'bow', size: '55px', anim: 'float-up', delay: '0s', duration: '9s', rot: '-15deg' },
    { top: '5%', left: '88%', sticker: 'star', size: '50px', anim: 'pulse-scale', delay: '1s', duration: '6s', rot: '12deg' },
    { top: '15%', left: '94%', sticker: 'heart', size: '48px', anim: 'sway', delay: '2s', duration: '8s', rot: '-20deg' },
    { top: '35%', left: '1%', sticker: 'cherry', size: '60px', anim: 'spin-slow', delay: '0s', duration: '18s', rot: '25deg' },
    { top: '50%', left: '96%', sticker: 'butterfly', size: '70px', anim: 'float-up', delay: '3.5s', duration: '12s', rot: '-10deg' },
    { top: '70%', left: '3%', sticker: 'ribbon', size: '75px', anim: 'pulse-scale', delay: '4s', duration: '7.5s', rot: '18deg' },
    { top: '85%', left: '90%', sticker: 'strawberry', size: '52px', anim: 'float-up', delay: '1.2s', duration: '10s', rot: '-8deg' },
    { top: '92%', left: '15%', sticker: 'moon', size: '54px', anim: 'sway', delay: '5s', duration: '8.5s', rot: '22deg' },
    { top: '90%', left: '75%', sticker: 'rose', size: '65px', anim: 'pulse-scale', delay: '2.5s', duration: '11s', rot: '-15deg' },
    { top: '20%', left: '50%', sticker: 'cloud', size: '85px', anim: 'float-up', delay: '6s', duration: '15s', rot: '5deg' },
    { top: '60%', left: '50%', sticker: 'sparkle', size: '45px', anim: 'pulse-scale', delay: '7s', duration: '5s', rot: '-12deg' },
    { top: '8%', left: '44%', sticker: 'ribbon', size: '68px', anim: 'sway', delay: '3.2s', duration: '9.5s', rot: '15deg' },
    { top: '40%', left: '88%', sticker: 'diamond', size: '46px', anim: 'float-up', delay: '0.4s', duration: '8.5s', rot: '-5deg' },
    { top: '75%', left: '45%', sticker: 'heart', size: '58px', anim: 'spin-slow', delay: '4s', duration: '19s', rot: '10deg' },
    { top: '55%', left: '8%', sticker: 'bow', size: '64px', anim: 'sway', delay: '2.2s', duration: '8s', rot: '-22deg' },
    { top: '30%', left: '20%', sticker: 'cherry', size: '48px', anim: 'float-up', delay: '5s', duration: '13s', rot: '8deg' }
  ];

  return (
    <div id="sticker-layer" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {positions.map((pos, idx) => {
        const src = stickerUrls[pos.sticker as keyof typeof stickerUrls];
        return (
          <img
            key={idx}
            src={src}
            alt="sweet decor"
            className="floating-sticker-item"
            loading="lazy"
            draggable="false"
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: pos.size,
              height: 'auto',
              opacity: 0.65,
              userSelect: 'none',
              transform: `rotate(${pos.rot})`,
              animation: `${pos.anim} ${pos.duration} ease-in-out ${pos.delay} infinite`,
              WebkitUserDrag: 'none',
              // Standard CSS custom property for rotate degree used in our CSS keyframes
              ['--rotate-deg' as any]: pos.rot
            }}
            onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
          />
        );
      })}
    </div>
  );
};
