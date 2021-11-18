export interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps): JSX.Element {
  return (
    <svg
      className={props.className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
        y="2.15"
        width="512"
        height="507.71"
        fill="#00833a"
        rx="15"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M414.49,105.87a9.42,9.42,0,0,0-9.42,9.42v26.54a29.4,29.4,0,0,1-21.67,28.31V131.85a9.42,9.42,0,0,0-18.84,0V171.2H342.89V142.53a9.42,9.42,0,0,0-18.84,0v30.28a64.56,64.56,0,0,0-46.23,39.75,71.26,71.26,0,0,0-43.65,0,64.56,64.56,0,0,0-46.23-39.75V142.53a9.42,9.42,0,0,0-18.84,0V171.2H147.44V131.85a9.42,9.42,0,0,0-18.84,0v38.29a29.4,29.4,0,0,1-21.67-28.31V115.29a9.42,9.42,0,1,0-18.84,0v26.54A48.26,48.26,0,0,0,136.3,190h37.3a45.93,45.93,0,0,1,43.49,30.67,71.63,71.63,0,0,0-15.47,13.61l-57.9-31.92a4.61,4.61,0,0,0-6.8,4.56l3.48,30.18a37.59,37.59,0,0,0,10.45,22h0A37.6,37.6,0,0,0,182,270.19l3.44-.4c-.14.92-.27,1.84-.37,2.76l-6.27,56a67.76,67.76,0,0,0,38,68.63,90.48,90.48,0,0,0,78.24,0,67.76,67.76,0,0,0,38-68.63l-6.27-56c-.1-.93-.24-1.85-.37-2.76l3.44.4a37.6,37.6,0,0,0,31.21-11.09h0a37.6,37.6,0,0,0,10.44-22L375.09,207a4.61,4.61,0,0,0-6.8-4.56l-57.9,31.92a71.63,71.63,0,0,0-15.47-13.61A45.93,45.93,0,0,1,338.4,190h37.3a48.26,48.26,0,0,0,48.21-48.21V115.29A9.42,9.42,0,0,0,414.49,105.87Z"
        fill="#fff"
      />
    </svg>
  );
}
