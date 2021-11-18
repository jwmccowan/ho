export default interface HoEvent {
  id: string;
  created_at: Date;
  event_date_time: Date;
  title: string;
  description?: string;
  host: string;
}
