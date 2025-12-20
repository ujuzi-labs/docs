export default function StandardButton({ children, ...props }) {
  return (
    <button 
      {...props}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ...props.style
      }}
    >
      {children}
    </button>
  );
}

