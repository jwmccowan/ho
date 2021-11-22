import clsx from "clsx";
import Link from "next/link";
import useSWR from "swr";
import HoEvent from "../../../api/interfaces/ho-event.interface";
import useSession from "../../../hooks/use-session";
import { supabase } from "../../../utils/supabase.client";
import useScroll from "./useScroll";

async function getEvents() {
  const { data: events, error } = await supabase.from("event");
  if (error) {
    throw error;
  }
  return events as HoEvent[];
}

export interface EventListProps {}

export default function EventList(props: EventListProps): JSX.Element {
  const [ref, isLeftest, isRightest] = useScroll();
  const session = useSession();

  const { data: events, isValidating: eventsLoading } = useSWR(
    ["get_events_home", session?.user?.id],
    getEvents
  );

  return (
    <div className="relative">
      <ul className="flex flex-row w-full overflow-x-auto" ref={ref}>
        {(events ?? []).map((event) => (
          <li className="bg-white mr-4 rounded-xl" key={event.id}>
            <Link href={`/events/${event.id}`} passHref>
              <a className="p-12 block">
                <div>
                  <h2 className="text-2xl whitespace-nowrap">{event.title}</h2>
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
