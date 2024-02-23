import React, { useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  const [scrollbarHeight, setScrollbarHeight] = useState<number>(0);
  const [scrollbarTop, setScrollbarTop] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableArea = scrollableAreaRef.current;
      const scrollbar = scrollbarRef.current;
      if (scrollableArea && scrollbar) {
        const totalHeight = scrollableArea.scrollHeight;
        const visibleHeight = scrollableArea.clientHeight;
        const scrollableHeight = totalHeight - visibleHeight;
        const scrollRatio = scrollableArea.scrollTop / scrollableHeight;
        const scrollbarHeight = (visibleHeight / totalHeight) * visibleHeight;
        const scrollbarTop = scrollRatio * (visibleHeight - scrollbarHeight);

        setScrollbarHeight(scrollbarHeight);
        setScrollbarTop(scrollbarTop);

        scrollbar.style.top = `${scrollbarTop}px`;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 1500);

        setIsScrolling(true);
      }
    };

    const scrollableArea = scrollableAreaRef.current;
    if (scrollableArea) {
      scrollableArea.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollableArea) {
        scrollableArea.removeEventListener('scroll', handleScroll);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isScrolling && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [isScrolling]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
      onMouseMove={() => {
        setIsScrolling(true);
      }}>
      <div
        style={{
          paddingRight: '15px',
          marginRight: '-15px',
          overflowY: 'scroll',
          height: '100vh',
        }}
        ref={scrollableAreaRef}>
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          top: scrollbarTop,
          right: '0',
          width: '5px',
          height: scrollbarHeight,
          background: '#6633EF',
          borderRadius: '5px 0px 0px 5px',
          zIndex: 999,
          opacity: isScrolling ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        ref={scrollbarRef}></div>
    </div>
  );
};

export default CustomScrollbar;
