/* eslint-disable react/display-name */
import React from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';

type Props = {
  error: { name: string; message: string; stack?: string };
};

export const ErrorIndicator = ({ error }: Props) => {
  const router = useRouter();
  return (
    <div tw="flex flex-col items-center justify-center h-screen">
      <div tw="h-screen flex justify-center items-center">
        <div tw="rounded-md bg-red-50 p-6 shadow-md">
          <div tw="flex">
            <div tw="flex-shrink-0">
              {/* <!-- Heroicon name: solid/x-circle --> */}
              <svg tw="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
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
      <button tw="mt-5 mb-10 p-3 bg-red-400 text-black border-none rounded-sm shadow-md cursor-pointer" onClick={() => router.push('/')}>
        Back to Home
      </button>
    </div>
  );
};
