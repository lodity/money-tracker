import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <>
      <div>
        <header>Header</header>
        <main>
          <div>
            <Outlet />
          </div>
        </main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
