interface Props {
  icon: 'close' | 'delete';
  disabled?: boolean;
  onClick: () => void;
}

const getIconSvg = (icon: 'close' | 'delete') => {
  if (icon === 'delete') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    );
  } else if (icon === 'close') {
    return (
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="Layer 2">
          <g data-name="close">
            <rect
              width="24"
              height="24"
              transform="rotate(180 12 12)"
              opacity="0"
            />
            <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
          </g>
        </g>
      </svg>
    );
  }
};

const IconButton = ({ icon, disabled = false, onClick }: Props) => (
  <button
    className="inline-flex items-center justify-center w-10 h-10 p-1 text-pink-100 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-gray-400"
    disabled={disabled}
    onClick={onClick}
  >
    {getIconSvg(icon)}
  </button>
);

export default IconButton;
