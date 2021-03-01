import React from 'react';
import 'twin.macro';
import { LoadingSvg } from './Svgs';

const LoadingIndicator = () => (
  <div tw="h-screen flex justify-center items-center">
    <div tw="w-80 h-80 p-2 flex justify-center items-center text-center">
      <LoadingSvg />
    </div>
  </div>
);

export default LoadingIndicator;
