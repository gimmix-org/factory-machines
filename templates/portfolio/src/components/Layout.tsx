import React, { FunctionComponent } from 'react';
import Menu from './Menu';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Menu />
      </header>
      <main>{children}</main>
      <style jsx>{`
        .layout {
          display: grid;
          grid-template-columns: 250px auto;
          height: 100vh;
          width: 100vw;
        }
        header {
          background-color: #f1f1f1;
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
      `}</style>
    </div>
  );
};

export default Layout;
