import React, { FunctionComponent } from 'react';

const Loading: FunctionComponent = () => {
  return (
    <div className="loading">
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <style jsx>{`
        .loading {
          display: flex;
          flex-direction: row;
          height: 100%;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #777;
        }
        .dot {
          font-size: 24px;
          animation: 1s blink infinite;
        }
        .dot:nth-child(1) {
          animation-delay: 0ms;
        }
        .dot:nth-child(2) {
          animation-delay: 250ms;
        }
        .dot:nth-child(3) {
          animation-delay: 500ms;
        }
        @keyframes blink {
          50% {
            color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
