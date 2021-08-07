import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

function Button({
  title, onClick, variant = 'default', size = 20
}) {
  const { theme } = useContext(ThemeContext);
  const titleButton = title.toString();
  const style = { textTransform: 'uppercase' };
  if (['icon', 'rounded'].includes(variant)) {
    style.borderRadius = '50%';
  }
  if (variant === 'icon') {
    style.width = size;
    style.height = size;
    style.maxWidth = size;
    style.maxHeight = size;
    style.minWidth = size;
    style.minHeight = size;
  }
  style.color = theme === 'dark' ? 'white' : 'black';
  style.backgroundColor = theme !== 'dark' ? 'white' : 'black';
  return (
    <button type="button" onClick={onClick} style={style}>
      {titleButton}
    </button>
  );
}

export default Button;
