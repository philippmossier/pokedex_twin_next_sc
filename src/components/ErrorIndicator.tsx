/* eslint-disable react/display-name */
import React from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { SolidXcircleSvg } from './Svgs';

type Props = {
  error: { name: string; message: string; stack?: string };
};

const ErrorIndicator = ({ error }: Props) => {
  const router = useRouter();
  return (
    <div tw="flex flex-col items-center justify-center h-screen">
      <div tw="h-screen flex justify-center items-center">
        <div tw="rounded-md bg-red-50 p-6 shadow-md">
          <div tw="flex">
            <div tw="flex-shrink-0">
              <SolidXcircleSvg />
            </div>
            <div tw="ml-3">
              <h3 tw="text-sm font-medium text-red-800 ">Error occured</h3>
              <div tw="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        tw="mt-5 mb-10 p-3 bg-red-400 text-black border-none rounded-sm shadow-md cursor-pointer"
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </div>
  );
};
export default ErrorIndicator;
