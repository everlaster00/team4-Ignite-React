
const igniteText = {
  textShadow: 
    '0 0 5px rgba(255, 30, 0, 0.8), ' +  // 코어
    '0 0 15px rgba(255, 255, 0, 0.6), ' + // 불꽃
    '0 0 25px rgba(255, 140, 0, 0.4)',  // 그림자

  filter: 'brightness(0.8) drop-shadow(0 0 11px rgba(255, 135, 0, 0.9))',

  transform: 'translateZ(0)',
};

export default function IgniteFont( {children} ) {
  return(
    <span className='IgniteFont'  style= {igniteText}>
      {children}
    </span>
  )
}