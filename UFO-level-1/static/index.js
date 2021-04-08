// Convert datetime values from string to date
function make_date(str){
    var str_split= str.split("/");
    var year= parseInt(str_split[2]);
    var day= parseInt(str_split[1]);
    var month= parseInt(str_split[0]);
    return new Date(year, month, day);
};

// Replace datetime string with a date
    // const defines a variable that can not be reassgined. Remains constant
const ufo_data= data.map(entry=>({...entry,datetime:make_date(entry.datetime)}));
// Make a display format of the data where the datetime displays better for the html site
var display_data= ufo_data.map(entry=>({...entry,datetime:entry.datetime.toLocaleDateString()}));
// Find earliest date and latest date in the data
var earliest_sighting= new Date(Math.min(...ufo_data.map(sighting=>sighting.datetime)));
var latest_sighting= new Date(Math.max(...ufo_data.map(sighting=>sighting.datetime)));

// Add instructions for calendar input
var instructions= d3.select(".instructions");
instructions.text(`Please select a date (MM/DD/YYYY) between
 ${earliest_sighting.toLocaleDateString()} and ${latest_sighting.toLocaleDateString()}.`)



// Insert table into html
    // Select area in html where table will be built
var tbody= d3.select("tbody");
    // Function to make table
function make_table(data){
    data.forEach(function(sighting) {
        var row = tbody.append("tr");
        Object.values(sighting).forEach((value)=>{
            var cell= row.append("td");
            cell.text(value);
        })
    })
};





// Select the form input
var input= d3.select("#input")

// Create event handler
input.on("submit", runEnter);

// Create funtion to run for event
function runEnter(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select the input elment and get the raw HTML node
    var date_input= d3.select("#date_input")
    // Get the value property of the input element
    date_input.on("change", function(event){
    var selected_date= event.target.valueAsDate;
    display_data= ufo_data.filter(entry=> entry.datetime=== selected_date)
    .map(entry=>({...entry,datetime:entry.datetime.toLocaleDateString()}));
    });
    // Display table
    make_table(display_data);   
} ;   