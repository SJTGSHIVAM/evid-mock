import React from 'react';

export const VideoContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-auto-fit-200 xs:grid-cols-auto-fit-280 justify-center">
      {children}
    </div>
  );
};
