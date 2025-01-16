export type Theme = 'dark' | 'light';

export const toggleTheme = () => {
  const root = window.document.documentElement;
  const isDark = root.classList.contains('dark');
  
  root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

export const initializeTheme = () => {
  const root = window.document.documentElement;
  const theme = localStorage.getItem('theme') as Theme | null;
  
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};