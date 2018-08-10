/* Need to add code here */
$.getJSON( "data/csharpcorner.json", function( data ) {
    localStorage.setItem("data", JSON.stringify(data));
  });