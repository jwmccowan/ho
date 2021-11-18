import clsx from "clsx";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import getEvents from "../../../api/get-events";
import HoEvent from "../../../api/interfaces/ho-event.interface";

function useScroll(): [RefObject<HTMLUListElement>, boolean, boolean] {
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

export interface EventListProps {}

export default function EventList(props: EventListProps): JSX.Element {
  const [ref, isLeftest, isRightest] = useScroll();
  const [events, setEvents] = useState<HoEvent[]>([]);
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);
  return (
    <div className="relative">
      <ul className="flex flex-row full-width overflow-x-auto" ref={ref}>
        {events.map((event) => (
          <li className="bg-white mr-4 rounded-xl" key={event.id}>
            <Link href={`/events/${event.id}`} passHref>
              <a className="p-12 block">
                <div>
                  <h2 className="text-2xl">{event.title}</h2>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={clsx(
          "w-24 transition-opacity duration-500 bg-gradient-to-l from-transparent to-red-300 absolute left-0 top-0 bottom-0 pointer-events-none",
          isLeftest ? "opacity-0" : "opacity-100"
        )}
      />
      <div
        className={clsx(
          "w-24 transition-opacity duration-500 bg-gradient-to-r from-transparent to-red-300 absolute right-0 top-0 bottom-0 pointer-events-none",
          isRightest ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
EventList.displayName = "EventList";
