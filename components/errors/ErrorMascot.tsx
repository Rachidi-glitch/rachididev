export function ErrorMascot() {
  return (
    <div className="error-mascot" aria-hidden="true">
      <svg
        className="error-mascot__float"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="110" cy="110" r="96" fill="#0A84FF" fillOpacity=".08" />
        <circle
          cx="110"
          cy="110"
          r="76"
          stroke="#1688FF"
          strokeOpacity=".2"
          strokeDasharray="5 9"
        />
        <path
          d="M110 31v18"
          stroke="#1688FF"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="110" cy="25" r="9" fill="#22D3EE" />
        <path
          d="M58 93c0-22 18-40 40-40h24c22 0 40 18 40 40v45c0 23-19 42-42 42h-20c-23 0-42-19-42-42V93Z"
          fill="#0B1C32"
          stroke="#1688FF"
          strokeWidth="5"
        />
        <path
          d="M58 103 42 116c-7 6-7 16 0 22l16 12M162 103l16 13c7 6 7 16 0 22l-16 12"
          stroke="#1688FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="72" y="82" width="76" height="48" rx="18" fill="#061426" />
        <circle cx="94" cy="106" r="6" fill="#22D3EE" />
        <circle cx="126" cy="106" r="6" fill="#22D3EE" />
        <path
          d="M96 148c8 8 20 8 28 0"
          stroke="#1688FF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="m88 181-5 10m49-10 5 10"
          stroke="#1688FF"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
