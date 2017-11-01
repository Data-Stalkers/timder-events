// go from day 1 to day 90. get a count of the days swipes.
// feed that into elasticsearch.

// NOTE: It's a good idea to create an index for ts and match before running this file.

let months = ['08', '09', '10'];
let days = []
for (let i = 1; i <= 30; i++) {
  if (i < 10) days.push('0'+ i);
  else days.push('' + i);
}



 /**
 + * Clears the query logger
 + * @function
 + */
