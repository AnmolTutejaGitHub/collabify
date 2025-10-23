import { useState } from "react";

export default function LazyImage() {
  const [loaded,setLoaded] = useState(false);

  return (
    <div className="w-1/2 flex justify-end m-10 mr-20 max-lg:hidden relative">
      {!loaded && (
        <div className="h-[80vh] w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
      )}

      <img
        src="/code.jpg"
        alt="code"
        className={`h-[80vh] ${loaded ? 'block' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}