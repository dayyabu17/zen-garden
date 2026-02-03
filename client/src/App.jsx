import React from 'react';
import Example from './components/Example';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Zen Garden</h1>
        <p className="text-sm text-slate-600 mb-6">A MERN demo with p5 and Tailwind.</p>
        <Example />
      </div>
    </div>
  );
}
