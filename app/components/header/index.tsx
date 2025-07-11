import { FC, ChangeEvent, useRef, useEffect, useState } from "react";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const HeaderWithSearch: FC<HeaderProps> = ({
  title = "Product List page",
  subtitle = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, molestias.",
  inputPlaceholder = "Type a keyword",
  inputValue,
  onInputChange,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchRef.current || !headerRef.current) return;
      const searchRect = searchRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();

      if (searchRect.top <= 0 && !isSticky) {
        setIsSticky(true);
      } else if (headerRect.top >= -128 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSticky]);

  return (
    <div className="w-full">
      <section
        ref={headerRef}
        className="w-full bg-gradient-to-br from-violet-900 to-fuchsia-500 py-8 flex flex-col items-center justify-center gap-y-8"
      >
        <div className="text-center flex flex-col gap-y-2">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className="text-white">{subtitle}</p>
        </div>
      </section>
      <div
        ref={searchRef}
        className={`w-full flex justify-center transition-shadow duration-300 ${isSticky ? "fixed top-0 left-0 z-50 shadow-lg" : ""}`}
        style={{
          minHeight: 0,
          background: "linear-gradient(to bottom right, #5b21b6, #d946ef)",
          width: "100%",
        }}
      >
        <div
          className={`
            pointer-events-auto
            flex justify-center py-4
            w-full
            transition-all duration-500 ease-in-out
          `}
          style={{
            position: "relative",
            maxHeight: 80,
            overflow: "hidden",
            willChange: "opacity, transform",
          }}
        >
          <input
            type="text"
            placeholder={inputPlaceholder}
            className="input w-[500px]"
            value={inputValue}
            onChange={onInputChange}
          />
        </div>
      </div>
      {isSticky && <div style={{ height: 80 }} />}
    </div>
  );
};