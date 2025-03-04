const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

async function generateOGImage() {
  try {
    // Create a canvas with the recommended OG image dimensions
    const width = 1200;
    const height = 630;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load the background image
    const backgroundImage = await loadImage(path.join(__dirname, '../public/ghana-house-party.jpg'));
    
    // Draw the background with a slight zoom and center crop
    const scale = Math.max(width / backgroundImage.width, height / backgroundImage.height);
    const scaledWidth = backgroundImage.width * scale;
    const scaledHeight = backgroundImage.height * scale;
    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;
    
    ctx.drawImage(backgroundImage, x, y, scaledWidth, scaledHeight);
    
    // Add a semi-transparent overlay for better text visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);
    
    // Add title text
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('STEAM-OFF DAYCATION', width / 2, height / 2 - 50);
    
    // Add subtitle
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#ff9500'; // Use a vibrant color for emphasis
    ctx.fillText('2025', width / 2, height / 2 + 50);
    
    // Add tagline
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Ghana\'s Premier House Party for MSc Business Analytics', width / 2, height / 2 + 120);
    
    // Save the canvas as a PNG buffer
    const buffer = canvas.toBuffer('image/png');
    
    // Use sharp to optimize the image
    await sharp(buffer)
      .jpeg({ quality: 90 })
      .toFile(path.join(__dirname, '../public/og-image.jpg'));
    
    console.log('OG image generated successfully!');
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOGImage(); 