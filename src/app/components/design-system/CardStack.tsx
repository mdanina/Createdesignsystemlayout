import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export type GradientType = 'coral' | 'blue' | 'pink' | 'lavender';

export interface CardItem {
  id: number;
  title: string;
  description?: string;
  image?: string;
  gradient?: GradientType;
  tag?: string; // Краткая команда/тег для карточки
}

export interface CardStackSettings {
  springDuration?: number;
  springBounce?: number;
  xSpringDuration?: number;
  xSpringBounce?: number;
  dragElastic?: number;
  swipeConfidenceThreshold?: number;
  zIndexDelay?: number;
}

interface CardStackProps {
  items: CardItem[];
  settings?: CardStackSettings;
  className?: string;
}

const defaultSettings: CardStackSettings = {
  springDuration: 0.3,
  springBounce: 0.3,
  xSpringDuration: 0.5,
  xSpringBounce: 0.1,
  dragElastic: 0.7,
  swipeConfidenceThreshold: 10000,
  zIndexDelay: 0.05,
};

const createCardVariants = (settings: CardStackSettings) => ({
  visible: (i: number) => ({
    opacity: 1,
    zIndex: [4, 3, 2, 1][i],
    scale: [1, 0.9, 0.85, 0.8][i],
    y: [0, -12, 0, 12][i],
    rotate: [0, 2, 4, 7][i],
    x: [0, 32, 48, 62][i],
    perspective: 400,
    transition: {
      zIndex: { delay: settings.zIndexDelay },
      scale: { type: "spring", duration: settings.springDuration, bounce: settings.springBounce },
      y: { type: "spring", duration: settings.springDuration, bounce: settings.springBounce },
      x: { type: "spring", duration: settings.xSpringDuration, bounce: settings.xSpringBounce },
    },
  }),
  exit: { opacity: 0, scale: 0.5, y: 50 },
});

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const gradientClasses: Record<GradientType, string> = {
  coral: 'bg-gradient-to-br from-[#FFE5D9] via-[#FFD7BA] to-[#FFCBB3]',
  blue: 'bg-gradient-to-br from-[#C9E4F5] via-[#B3D9F0] to-[#A8D4EB]',
  pink: 'bg-gradient-to-br from-[#FFD1DC] via-[#FFC9DF] to-[#FFC2D1]',
  lavender: 'bg-gradient-to-br from-[#E8D5F2] via-[#D9C2E8] to-[#D4C5F0]',
};

const defaultGradients: GradientType[] = ['coral', 'blue', 'pink', 'lavender'];

export const CardStack: React.FC<CardStackProps> = ({ 
  items, 
  settings: userSettings,
  className = ""
}) => {
  const settings = { ...defaultSettings, ...userSettings };
  const [[page, direction], setPage] = useState([0, 0]);
  const [indices, setIndices] = useState([0, 1, 2, 3]);
  const [dragElastic, setDragElastic] = useState(settings.dragElastic);

  useEffect(() => {
    setDragElastic(settings.dragElastic || 0.7);
  }, [settings.dragElastic]);

  const paginate = () => {
    setIndices((prevIndices) => [
      prevIndices[1],
      prevIndices[2],
      prevIndices[3],
      prevIndices[0],
    ]);
  };

  const cardVariants = createCardVariants(settings);

  return (
    <div className={`relative w-[343px] h-[484px] ${className}`}>
      <AnimatePresence initial={false}>
        {indices.map((index, i) => (
          <motion.div
            key={items[index % items.length].id}
            custom={i}
            variants={cardVariants}
            initial="exit"
            animate="visible"
            exit="exit"
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={dragElastic}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (
                swipe < -(settings.swipeConfidenceThreshold || 10000) ||
                swipe > (settings.swipeConfidenceThreshold || 10000)
              ) {
                paginate();
              }
            }}
            className="absolute h-[484px] w-[323px] rounded-[24px] bg-white shadow-[0px_35px_14px_rgba(0,0,0,0.01),0px_20px_12px_rgba(0,0,0,0.05),0px_9px_9px_rgba(0,0,0,0.09),0px_2px_5px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing overflow-hidden"
          >
            {(() => {
              const currentItem = items[index % items.length];
              const gradient = currentItem.gradient || defaultGradients[index % defaultGradients.length];
              
              if (currentItem.image) {
                return (
                  <img 
                    src={currentItem.image} 
                    alt={currentItem.title}
                    className="h-full w-full object-cover rounded-[24px]"
                  />
                );
              }
              
              return (
                <div className={`h-full w-full ${gradientClasses[gradient]} rounded-[24px] flex flex-col justify-between p-6`}>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center px-4">
                      <h3 className="text-2xl font-semibold text-[#2D2D2D] mb-3">{currentItem.title}</h3>
                      {currentItem.description && (
                        <p className="text-[#666666] text-sm leading-relaxed">{currentItem.description}</p>
                      )}
                    </div>
                  </div>
                  {currentItem.tag && (
                    <div className="mt-4 flex justify-start">
                      <span className="bg-white/80 backdrop-blur-sm text-[#2D2D2D] text-xs font-medium px-4 py-2 rounded-full border border-white/50">
                        {currentItem.tag}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CardStack;

