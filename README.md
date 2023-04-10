# Running

To run this you have to run both the server AND the CORS proxy

lcp --proxyUrl http://magicseaweed.com/ &
http-server -a localhost -p 80
 
 # Buoy API how to:

 https://www.ndbc.noaa.gov/rt_data_access.shtml

 Times are in GMT

# Buoys

The Bouy wave off the CC coast to the E/SE is: 42020
- https://www.ndbc.noaa.gov/data/realtime2/42020.txt

8775870 - Buoy where I get tide data

# 8775792 - Packery Channel Buoy (a bit to the west), Also called PACT2

https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8775792&product=wind&datum=STND&time_zone=lst_ldt&interval=h&units=english&format=json


this one seems to return the most:

https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8775792&product=wind&datum=STND&time_zone=lst_ldt&units=english&format=json


https://www.ndbc.noaa.gov/data/realtime2/PACT2.txt


# Where data comes from:


API that returns CSVs
https://www.tidesandcurrents.noaa.gov/web_services_info.html
https://www.tidesandcurrents.noaa.gov/api-helper/url-generator.html

# 87