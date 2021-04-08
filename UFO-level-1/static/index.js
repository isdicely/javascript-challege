// Variable that can not be reassgined. Remains constant
const ufo_data= data
// Select area in html where table will be built
var tbody= d3.select("tbody");

function make_table(data){
    data.forEach(function(sighting) {
        var row = tbody.append("tr");
        Object.values(sighting).forEach((value)=>{
            var cell= row.append("td");
            cell.text(value);
        })
    })
};

make_table(ufo_data);

var earliest_sighting= ufo_data.forEach(function(sighting){
    Object.values(sighting).forEach((value)=>{
        Math.min(sighting.datetime)
    })
})
var latest_sighting

console.log(earliest_sighting);