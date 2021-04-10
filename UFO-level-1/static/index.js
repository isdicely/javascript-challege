// Convert datetime values from string to date
function make_date(str){
    // Split the string, splitting by "/""
    var str_split= str.split("/");
    // Set year to the 3rd element on the array
    var year= parseInt(str_split[2]);
    // Set day to the 2nd element of the array
    var day= parseInt(str_split[1]);
    // Set month to the 1st element of the array
    var month= parseInt(str_split[0]);
    // Return the date
    return new Date(year, month, day);
};


// Replace datetime string with a date
    // const defines a variable that can not be reassgined. Remains constant
const ufo_data= data.map(entry=>({...entry,datetime:make_date(entry.datetime)}));
// Make a display format of the data where the datetime displays better for the html site
var display_data= ufo_data.map(entry=>({...entry,datetime:entry.datetime.toLocaleDateString()}));
// Find earliest date and latest date in the data
    // Will use this for the instructions for filtering the data
var earliest_sighting= new Date(Math.min(...ufo_data.map(sighting=>sighting.datetime)));
var latest_sighting= new Date(Math.max(...ufo_data.map(sighting=>sighting.datetime)));
// Add instructions for calendar input
var instructions= d3.select(".instructions");
instructions.text(`Select a date between: ${earliest_sighting.toLocaleDateString()} - ${latest_sighting.toLocaleDateString()}.`)


// Insert table into html
    // Select area in html where table will be built
var tbody= d3.select("tbody");
    // Function to make table
function make_table(data){
    // Clear any input
    tbody.html("");
    // Create as many rows needed equal to the sightings, and append the data into cells
    data.forEach(function(sighting) {
        var row = tbody.append("tr");
        Object.values(sighting).forEach((value)=>{
            var cell= row.append("td");
            cell.text(value);
        })
    })
};


// Select the form input (date format)
var date_input= d3.select("#date_input")
// Adding attribute to make a range a min and max for the calendar input
date_input.attr("min",earliest_sighting.toISOString().slice(0,10))
date_input.attr("max",latest_sighting.toISOString().slice(0,10))
date_input.attr("value", earliest_sighting.toISOString().slice(0,10))


// Create event handler, set on change
date_input.on("change", runEnter);
// Create funtion to run for event
function runEnter(event, d){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Convert date input into dat/time format and added time to help display correct date on filter.
    var selected_date=new Date(`${this.value}T12:00:00`).toLocaleDateString()
    // Filter data based on selected date
    const filtered_display_data = display_data.filter(entry=> entry.datetime === selected_date)
    
    // Display table
    make_table(filtered_display_data);   
} ;