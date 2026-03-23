import type { FC } from 'react';
import { SpringAnimationDemo } from './components/spring-animation/index.js';

export const App: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <SpringAnimationDemo />
    </div>
  );
};
