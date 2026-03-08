export const initCursor = () => {
  if (window.innerWidth <= 768) return () => {}; // Disable on mobile

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const moveCursor = (e: MouseEvent) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select, [role="button"]')) {
      cursor.classList.add('hover');
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, textarea, select, [role="button"]')) {
      cursor.classList.remove('hover');
    }
  };

  window.addEventListener('mousemove', moveCursor);
  document.body.addEventListener('mouseover', handleMouseOver);
  document.body.addEventListener('mouseout', handleMouseOut);

  return () => {
    window.removeEventListener('mousemove', moveCursor);
    document.body.removeEventListener('mouseover', handleMouseOver);
    document.body.removeEventListener('mouseout', handleMouseOut);
    if (document.body.contains(cursor)) {
      document.body.removeChild(cursor);
    }
  };
};
