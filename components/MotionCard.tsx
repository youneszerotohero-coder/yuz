interface MotionCardProps {
  index: number;
  total: number;
  url: string;
}

const MotionCard = ({ index, total, url }: MotionCardProps) => {
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const rotate = offset * 1;
  const translateX = offset * 110;
  const translateY = Math.abs(offset) * 1;

  return (
    <div
      className='absolute w-[11em] h-[11em] rounded-xl shadow-lg
      hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: `card-fan 0.8s ease-out 2.5s forwards`,
        transformOrigin: 'bottom center',
        zIndex: total - Math.abs(offset),
        '--fan-rotate': `${rotate}deg`,
        '--fan-tx': `${translateX}px`,
        '--fan-ty': `${translateY}px`,
      } as React.CSSProperties}
    />
  )
}

export default MotionCard;