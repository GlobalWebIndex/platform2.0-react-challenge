interface Props {
  icon: 'close' | 'delete' | 'favorite';
  disabled?: boolean;
  onClick: () => void;
}

const getIconSvg = (icon: 'close' | 'delete' | 'favorite') => {
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
  } else if (icon === 'favorite') {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
      >
        <g>
          <g>
            <path d="m344.2,235.6h-67.8v-67.8c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4v67.8h-67.8c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h67.8v67.8c0,11.3 9.1,20.4 20.4,20.4s20.4-9.1 20.4-20.4v-67.8h67.8c11.3,0 20.4-9.1 20.4-20.4 5.68434e-14-11.3-9.1-20.4-20.4-20.4z" />
            <path d="m363.5,11c-42.5,0-81.8,19.5-107.5,51.7-25.7-32.2-65-51.7-107.5-51.7-75.8,0-137.5,61.7-137.5,137.5 0,27.3 12.5,61.7 38.3,105.2 19.3,32.6 46.1,70.2 79.7,111.8 56.7,70.3 114.3,128.8 114.8,129.4 4,4.1 9.3,6.1 14.6,6.1 5.2,0 10.3-1.9 14.3-5.8 2.3-2.2 57-55.8 112.6-124.5 76.8-94.7 115.7-169.5 115.7-222.2 0-75.8-61.7-137.5-137.5-137.5zm64.6,227.8c-17.8,31.3-42.8,66.9-74.3,105.8-37.3,46.1-75.1,86.1-95.1,106.5-20.3-21.4-59.2-63.6-97.8-111.4-94.7-117.4-108.9-170.2-108.9-191.2 0-53.2 43.3-96.5 96.5-96.5 38.6,0 73.4,22.9 88.7,58.4 3.2,7.5 10.6,12.4 18.8,12.4s15.6-4.9 18.8-12.4c15.3-35.5 50.1-58.4 88.7-58.4 53.2,0 96.5,43.3 96.5,96.5 0,22.7-10.7,53.1-31.9,90.3z" />
          </g>
        </g>
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
