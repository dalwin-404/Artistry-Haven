import { useState, useRef, useEffect } from 'react';
import './SwipeablePhotoStack.css';

interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  description?: string;
}

interface SwipeablePhotoStackProps {
  photos: Photo[];
}

export default function SwipeablePhotoStack({ photos }: SwipeablePhotoStackProps) {
  const [stack, setStack] = useState<Photo[]>(photos);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 100; // Minimum distance to trigger swipe
  const rotationAmount = 0.05; // Rotation per pixel dragged

  useEffect(() => {
    // Shuffle stack on mount for variety
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    setStack(shuffled);
  }, [photos]);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
    setRotation(deltaX * rotationAmount);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const absX = Math.abs(dragOffset.x);
    
    if (absX > swipeThreshold) {
      // Swipe detected - animate card off screen
      const direction = dragOffset.x > 0 ? 1 : -1;
      swipeCard(direction);
      // Keep dragging state briefly to allow exit animation
      setTimeout(() => setIsDragging(false), 350);
    } else {
      // Return card to center
      setIsDragging(false);
      setTimeout(() => {
        setDragOffset({ x: 0, y: 0 });
        setRotation(0);
      }, 10);
    }
  };

  const swipeCard = (direction: number) => {
    setIsAnimating(true);
    
    // Animate current card off screen
    const exitX = direction * window.innerWidth * 1.5;
    const exitRotation = direction * 30;
    
    // Set final position for animation
    setDragOffset({ x: exitX, y: 0 });
    setRotation(exitRotation);
    
    // After exit animation completes, cycle card to back smoothly
    setTimeout(() => {
      const newStack = [...stack];
      const swipedCard = newStack.shift();
      if (swipedCard) {
        newStack.push(swipedCard);
        
        // Update stack to trigger smooth transitions for background cards
        setStack(newStack);
        
        // Reset for next card (which is now the top card) after stack animation
        setTimeout(() => {
          setDragOffset({ x: 0, y: 0 });
          setRotation(0);
          setIsAnimating(false);
        }, 100);
      } else {
        setIsAnimating(false);
      }
    }, 400); // Wait for exit animation to complete
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Global mouse/touch handlers for dragging outside card
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleGlobalTouchEnd = () => {
      handleEnd();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, dragStart]);

  if (stack.length === 0) {
    return <div className="no-photos">No photos available</div>;
  }

  const topCard = stack[0];
  const nextCards = stack.slice(1, 4); // Show next 3 cards stacked

  return (
    <div className="swipeable-stack-container">
      <div className="stack-wrapper">
        {/* Background cards (stacked behind) */}
        {nextCards.map((photo, index) => {
          // Position in stack (index + 1 because index 0 is the top card)
          const position = index + 1;
          
          return (
            <div
              key={`${photo.id}-${stack.findIndex(p => p.id === photo.id)}`}
              className="stack-card background-card"
              style={{
                transform: `scale(${1 - position * 0.05}) translateY(${position * 10}px)`,
                zIndex: stack.length - position,
                opacity: Math.max(0.3, 1 - position * 0.15),
              }}
            >
              <img src={photo.imageUrl} alt={photo.title} />
              <div className="card-info">
                <h3>{photo.title}</h3>
                <p>by {photo.artist}</p>
              </div>
            </div>
          );
        })}

        {/* Top card (draggable) */}
        <div
          ref={cardRef}
          className={`stack-card top-card ${isDragging ? 'dragging' : 'not-dragging'} ${isAnimating ? 'animating-out' : ''}`}
          style={{
            transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`,
            zIndex: stack.length + 10,
            opacity: isAnimating ? 0 : 1,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img src={topCard.imageUrl} alt={topCard.title} />
          <div className="card-info">
            <h3>{topCard.title}</h3>
            <p>by {topCard.artist}</p>
            {topCard.description && (
              <p className="card-description">{topCard.description}</p>
            )}
          </div>
          
          {/* Swipe indicators */}
          <div className={`swipe-indicator swipe-left ${dragOffset.x < -50 && !isAnimating ? 'active' : ''}`}>
            ✕
          </div>
          <div className={`swipe-indicator swipe-right ${dragOffset.x > 50 && !isAnimating ? 'active' : ''}`}>
            ✓
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="stack-instructions">
        <p>Swipe left or right to explore more artworks</p>
      </div>
    </div>
  );
}

