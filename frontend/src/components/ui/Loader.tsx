import logo from "assets/images/logo.png";

export const Loader = () => {
  return (
    <div className="w-screen h-screen absolute z-[9999] inline-flex flex-col items-center gap-10 justify-center">
      <div className="flex items-center justify-center relative">
        <img src={logo} alt="logo" className="absolute" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          className="animate-spin"
        >
          <path
            d="M195.081 100C197.798 100 200.013 97.7962 199.879 95.083C198.991 77.0305 193.223 59.5222 183.147 44.443C172.159 27.9981 156.541 15.1808 138.268 7.61205C119.996 0.0432834 99.8891 -1.93705 80.491 1.92147C61.0929 5.77999 43.2746 15.3041 29.2893 29.2893C15.3041 43.2746 5.77999 61.0929 1.92147 80.491C-1.93705 99.8891 0.0432836 119.996 7.61205 138.268C15.1808 156.541 27.9981 172.159 44.443 183.147C59.5222 193.223 77.0305 198.991 95.083 199.879C97.7962 200.013 100 197.798 100 195.081C100 192.365 97.7961 190.177 95.0836 190.028C78.9779 189.149 63.3696 183.962 49.9083 174.967C35.0812 165.06 23.5248 150.979 16.7006 134.504C9.87644 118.029 8.09092 99.9 11.5699 82.4101C15.0488 64.9203 23.636 48.8549 36.2454 36.2454C48.8549 23.636 64.9203 15.0488 82.4101 11.5699C99.9 8.09092 118.029 9.87644 134.504 16.7006C150.979 23.5248 165.06 35.0812 174.967 49.9083C183.962 63.3696 189.149 78.9779 190.028 95.0836C190.177 97.7961 192.365 100 195.081 100Z"
            fill="url(#paint0_linear_415_1288)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_415_1288"
              x1="100"
              y1="0"
              x2="100"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#000E89" />
              <stop offset="1" stop-color="#1A30FF" stop-opacity="0.64" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="font-lato text-brand-main text-body-lg lg:text-display-sm font-medium">
        Loading....
      </p>
    </div>
  );
};
