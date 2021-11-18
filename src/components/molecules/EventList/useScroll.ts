import { RefObject, useEffect, useRef, useState } from "react";

export default function useScroll(): [
  RefObject<HTMLUListElement>,
  boolean,
  boolean
] {
  const ref = useRef<HTMLUListElement>(null);
  const [isLeftest, setIsLeftest] = useState(true);
  const [isRightest, setIsRightest] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const li = ref.current;
      setIsLeftest(li.scrollLeft === 0);
      setIsRightest(li.scrollLeft === li.scrollWidth);
      const handleScroll = (ev: any) => {
        setIsLeftest(ev.target.scrollLeft === 0);
        setIsRightest(ev.target.scrollLeft === ev.target.scrollLeftMax);
      };
      li.addEventListener("scroll", handleScroll);
      return () => li.removeEventListener("scroll", handleScroll);
    }
    return undefined;
  }, [ref]);
  return [ref, isLeftest, isRightest];
}
