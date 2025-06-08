import React from 'react';
import QRCode from 'qrcode.react';

interface QRGeneratorProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({
  value,
  size = 200,
  bgColor = '#ffffff',
  fgColor = '#000000',
  level = 'L',
  includeMargin = true,
}) => {
  return (
    <div className="flex items-center justify-center">
      <QRCode
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={includeMargin}
        renderAs="svg"
      />
    </div>
  );
};

export default QRGenerator;