export default function FeatureText({ text, href, className = '', colorSelections = [] }) {
  return (
    <a 
      href={href} 
      className={className}
      style={{ textDecoration: 'none' }}
    >
      {text}
    </a>
  );
}

