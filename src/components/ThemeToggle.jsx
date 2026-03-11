import React from 'react';

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(d => !d)}>
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}
