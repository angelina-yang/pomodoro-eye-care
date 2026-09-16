// Generate PWA icons using Node.js canvas-like approach
// Creates a teal rounded square with an eye icon

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const pad = size * 0.1;
  const radius = size * 0.2;

  // Teal background with rounded corners
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.moveTo(pad + radius, pad);
  ctx.lineTo(size - pad - radius, pad);
  ctx.quadraticCurveTo(size - pad, pad, size - pad, pad + radius);
  ctx.lineTo(size - pad, size - pad - radius);
  ctx.quadraticCurveTo(size - pad, size - pad, size - pad - radius, size - pad);
  ctx.lineTo(pad + radius, size - pad);
  ctx.quadraticCurveTo(pad, size - pad, pad, size - pad - radius);
  ctx.lineTo(pad, pad + radius);
  ctx.quadraticCurveTo(pad, pad, pad + radius, pad);
  ctx.closePath();
  ctx.fill();

  // Eye shape (white)
  const cx = size / 2;
  const cy = size / 2;
  const eyeW = size * 0.35;
  const eyeH = size * 0.18;

  ctx.strokeStyle = 'white';
  ctx.lineWidth = size * 0.04;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Eye outline
  ctx.beginPath();
  ctx.moveTo(cx - eyeW, cy);
  ctx.quadraticCurveTo(cx, cy - eyeH * 2, cx + eyeW, cy);
  ctx.quadraticCurveTo(cx, cy + eyeH * 2, cx - eyeW, cy);
  ctx.stroke();

  // Pupil (filled white circle)
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.07, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toBuffer('image/png');
}

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/icon-192.png', generateIcon(192));
writeFileSync('public/icons/icon-512.png', generateIcon(512));
console.log('Icons generated!');
