import React, { FunctionComponent } from 'react';
import Menu from '@components/Menu';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <main>{children}</main>
      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 250px auto;
          height: 100vh;
          width: 100vw;
        }
        main {
          padding: 20px;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        body,
        html {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        a {
          color: inherit;
        }
        h1 {
          font-weight: 500;
        }
        button,
        .button {
          background-color: black;
          color: white;
          outline: none;
          border: none;
          border-radius: 3px;
          padding: 5px 10px;
          font-size: 12px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Layout;
