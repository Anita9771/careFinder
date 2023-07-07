import React, { Suspense } from 'react';
import { SearchRegion } from '../pages';

function LazyLoader() {
  return (
    <div>
      <h1>My Component</h1>
      <Suspense fallback={<div>Suspense...</div>}>
        <SearchRegion />
      </Suspense>
    </div>
  );
}

export default LazyLoader;