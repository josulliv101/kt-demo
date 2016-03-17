const bar = {
  position: 'fixed',
  top: '1rem',
  left: 'none',
  right: '-100%',
  width: 'auto',
  maxHeight: 54,
  padding: '2rem',
  margin: 0,
  zIndex: 999999,
  color: '#fafafa',
  font: '1.6rem normal Roboto, sans-serif',
  borderRadius: '2px',
  background: '#333', // 3097d1
  borderSizing: 'border-box',
  boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
  cursor: 'default',
  WebKittransition: '.9s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  MozTransition: '.9s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  msTransition: '.9s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  OTransition: '.9s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
  transition: '.9s cubic-bezier(0.89, 0.01, 0.5, 1.1)',

  // Trigger GPU acceleration
  WebkitTransform: 'translatez(0)',
  MozTransform: 'translatez(0)',
  msTransform: 'translatez(0)',
  OTransform: 'translatez(0)',
  transform: 'translatez(0)',
};

const active = {
  top: '1rem',
  left: 'none',
  right: '1rem',
};

const action = {
  padding: '0.125rem',
  marginLeft: '1rem',
  color: '#fff', // f44336
  font: '.75rem normal Roboto, sans-serif',
  lineHeight: '1rem',
  letterSpacing: '.125ex',
  textTransform: 'uppercase',
  borderRadius: '2px',
  cursor: 'pointer',
};

export default {
  bar, active, action,
};
