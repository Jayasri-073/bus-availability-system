-- 1. Create the table
create table if not exists public.buses (
  id bigint generated always as identity primary key,
  bus_name text not null,
  bus_number text not null,
  from_location text not null,
  to_location text not null,
  travel_date date not null,
  departure_time text not null,
  arrival_time text not null,
  bus_type text not null,
  available_seats integer not null check (available_seats >= 0),
  price integer not null check (price >= 0)
);

-- 2. Make searching faster
create index if not exists buses_search_idx
  on public.buses (from_location, to_location, travel_date);

-- 3. Security: turn on Row Level Security, allow READ ONLY
alter table public.buses enable row level security;

drop policy if exists "Anyone can read buses" on public.buses;
create policy "Anyone can read buses"
  on public.buses
  for select
  to anon, authenticated
  using (true);
-- No insert/update/delete policy = the website cannot change data.

-- 4. Sample data: 12 buses, each created for the next 7 days
insert into public.buses
  (bus_name, bus_number, from_location, to_location, travel_date,
   departure_time, arrival_time, bus_type, available_seats, price)
select v.bus_name, v.bus_number, v.from_location, v.to_location,
       current_date + d, v.departure_time, v.arrival_time,
       v.bus_type, v.available_seats, v.price
from (values
  ('Tamil Nadu Express',   'TN-01-1234', 'Chennai',    'Madurai',    '08:00 AM', '02:30 PM', 'AC Sleeper',      24, 650),
  ('Highway King',         'TN-01-8899', 'Chennai',    'Madurai',    '09:00 PM', '05:00 AM', 'Non-AC Sleeper',  20, 550),
  ('Kovai Star',           'TN-38-7712', 'Chennai',    'Coimbatore', '10:00 PM', '05:30 AM', 'AC Semi Sleeper', 12, 780),
  ('Rock Fort Express',    'TN-45-9087', 'Chennai',    'Trichy',     '06:00 AM', '11:30 AM', 'Non-AC Seater',  35, 380),
  ('Meenakshi Travels',    'TN-59-4821', 'Madurai',    'Chennai',    '09:30 PM', '05:00 AM', 'AC Sleeper',      18, 700),
  ('Coimbatore Comfort',   'TN-37-3345', 'Coimbatore', 'Chennai',    '09:00 PM', '04:30 AM', 'AC Semi Sleeper', 15, 760),
  ('Cauvery Queen',        'TN-45-1180', 'Trichy',     'Chennai',    '01:00 PM', '06:30 PM', 'AC Seater',       22, 420),
  ('Salem Steel Line',     'TN-30-2210', 'Chennai',    'Salem',      '07:00 AM', '12:30 PM', 'AC Seater',       26, 450),
  ('Mango City Express',   'TN-30-5567', 'Chennai',    'Salem',      '11:00 PM', '04:30 AM', 'Non-AC Sleeper',  14, 480),
  ('Steel Rider',          'TN-30-9012', 'Salem',      'Chennai',    '08:30 AM', '02:00 PM', 'Non-AC Seater',   30, 360),
  ('Night Owl Travels',    'TN-30-7745', 'Salem',      'Chennai',    '10:30 PM', '04:00 AM', 'AC Sleeper',      10, 620),
  ('Southern Star',        'TN-72-6403', 'Madurai',    'Coimbatore', '05:30 AM', '10:30 AM', 'Non-AC Seater',   28, 350)
) as v(bus_name, bus_number, from_location, to_location,
       departure_time, arrival_time, bus_type, available_seats, price)
cross join generate_series(1, 7) as d;
