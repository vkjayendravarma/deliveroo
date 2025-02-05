
# CRON Expression Parsers

This is a cli application to infer cron expression

## Requirements

This application requires node js installed 

## About cron 
This application has capability of handling values of 5 character limit and of following format 
"minute hour day_of_month month day_of_week"

### Acceptable values and inference  

Field   |	Allowed Values  |	Special Characters
| ---   | --- | --- |
Minute  |	0-59    |	, - * /
Hour    |	0-23    |	, - * /
Day of Month    |	1-31    |	, - * / ? L W
Month   |	1-12   |	, - * /
Day of Week |	0-7     |	, - * / ? L #

## Example

``` node index.js "*/15 0 W * 1#3" /usr/bin/find```

* argument 1 is for node environment 
* argument 2 is for file
* argument 3 is the cron expression
* argument 4 is the command 

this infers as following 

Field   |    Values  
| ---   | --- 
minute | 0 15 30 45
hour | 0
day of month | 31
month | 1 2 3 4 5 6 7 8 9 10 11 12
day of week | weak number 3 and MON
command |  /usr/bin/find