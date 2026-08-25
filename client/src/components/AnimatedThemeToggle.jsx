import React, { useContext, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { flushSync } from 'react-dom';

const getPositionCoords = (position) => {
  switch (position) {
    case 'top-left':
      return { cx: '0', cy: '0' };
    case 'top-right':
      return { cx: '40', cy: '0' };
    case 'bottom-left':
      return { cx: '0', cy: '40' };
    case 'bottom-right':
      return { cx: '40', cy: '40' };
    case 'top-center':
      return { cx: '20', cy: '0' };
    case 'bottom-center':
      return { cx: '20', cy: '40' };
    case 'center':
    default:
      return { cx: '20', cy: '20' };
  }
};

const generateSVG = (variant, start) => {
  if (start === 'center') return '';
  if (variant === 'rectangle') return '';

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) return '';
  const { cx, cy } = positionCoords;

  if (variant === 'circle') {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return '';
};

const getTransformOrigin = (start) => {
  switch (start) {
    case 'top-left': return 'top left';
    case 'top-right': return 'top right';
    case 'bottom-left': return 'bottom left';
    case 'bottom-right': return 'bottom right';
    case 'top-center': return 'top center';
    case 'bottom-center': return 'bottom center';
    default: return 'center';
  }
};

const createAnimation = (variant = 'circle', start = 'center') => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === 'circle' && start === 'center') {
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      ::view-transition-old(root),
      [data-theme="dark"]::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      [data-theme="dark"]::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }

      @keyframes reveal-light {
        from {
           clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }
      `,
    };
  }

  // Handle other variants if needed, for now defaulting to center circle
  return {
    name: `circle-center`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }
      ::view-transition-old(root), [data-theme="dark"]::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      [data-theme="dark"]::view-transition-new(root) {
        animation-name: reveal-dark;
      }
      @keyframes reveal-dark {
        from { clip-path: circle(0% at 50% 50%); }
        to { clip-path: circle(100.0% at 50% 50%); }
      }
      @keyframes reveal-light {
        from { clip-path: circle(0% at 50% 50%); }
        to { clip-path: circle(100.0% at 50% 50%); }
      }
    `
  };
};

export const useThemeToggle = (variant = 'circle', start = 'center') => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const styleId = 'theme-transition-styles';

  const updateStyles = useCallback((css) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const handleToggle = useCallback(() => {
    const animation = createAnimation(variant, start);
    updateStyles(animation.css);

    if (typeof window === 'undefined') return;

    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });
  }, [variant, start, updateStyles, toggleTheme]);

  return {
    isDark,
    handleToggle,
  };
};

export const AnimatedThemeToggle = ({
  className = '',
  variant = 'circle',
  start = 'center'
}) => {
  const { isDark, handleToggle } = useThemeToggle(variant, start);

  return (
    <button
      type="button"
      style={{
        width: '36px',
        height: '36px',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: 'var(--text-primary)',
        padding: '0',
        transition: 'all 0.3s ease',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={className}
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <span className="sr-only" style={{ display: 'none' }}>Toggle theme</span>
      <svg 
        viewBox="0 0 240 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '20px', height: '20px' }}
      >
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="var(--bg-primary)"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="var(--text-primary)"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="var(--bg-primary)"
        />
      </svg>
    </button>
  );
};
