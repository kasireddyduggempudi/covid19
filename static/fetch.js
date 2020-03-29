simplemaps_countrymap.hooks.ready = function (){
// optionally update simplemaps_worldmap.mapdata
simplemaps_countrymap.load();

// changing description of every state
for(let stateId in simplemaps_countrymap_mapdata.state_specific){
    let stats = data[simplemaps_countrymap_mapdata.state_specific[stateId].name];
    if(stats){
    //simplemaps_countrymap_mapdata.state_specific[stateId].description = "Confirmed: "+stats["confirmed"]+"<br />"+"Recovered: "+stats["recovered"]+"<br />"+"Deaths: "+stats["deaths"];
    simplemaps_countrymap_mapdata.state_specific[stateId].description = "<font style='color:white'>Confirmed: "+stats["confirmed"]+"<br />Recovered: "+stats["recovered"]+"<br />Deaths: "+stats["deaths"]+"</font>";
    }
}

simplemaps_countrymap.refresh();

// fetch("http://localhost:5000/getAllStatesCovidData")
//     .then(response=>response.text())  // gives the body as string
//     .then(body=>JSON.parse(body))   // gives the body as json
//     .then(data=>{
//         for(let stateId in simplemaps_countrymap_mapdata.state_specific){
//             let stats = data[simplemaps_countrymap_mapdata.state_specific[stateId].name];
//             if(stats){
//             //simplemaps_countrymap_mapdata.state_specific[stateId].description = "Confirmed: "+stats["confirmed"]+"<br />"+"Recovered: "+stats["recovered"]+"<br />"+"Deaths: "+stats["deaths"];
//             simplemaps_countrymap_mapdata.state_specific[stateId].description = "<font style='color:white'>Confirmed: "+stats["confirmed"]+"<br />Recovered: "+stats["recovered"]+"<br />Deaths: "+stats["deaths"]+"</font>";
//             }
//         }
//         simplemaps_countrymap.refresh();

//     })
//     .catch(err=>{
//         console.log(err);
//     })

    //simplemaps_countrymap_mapdata.state_specific[2].description = "kasireddy"
    //simplemaps_countrymap.refresh();
}
