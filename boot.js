// If user hasn't authed with Fitbit, redirect to Fitbit OAuth Implicit Grant Flow
var fitbitAccessToken;
document.querySelector("#redUrl").value = window.location.href;
if (!window.location.hash) {
    document.querySelector("#output").style.display = `none`;
    document.querySelector("#start").addEventListener("click", start);
}else{
    document.querySelector("#input").style.display = `none`;
    var fragmentQueryParameters = {};
    window.location.hash.slice(1).replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
    );
    console.log(fragmentQueryParameters);
    fitbitAccessToken = fragmentQueryParameters.access_token;
    document.querySelector("#access_token").value = fitbitAccessToken;
    document.querySelector("#data").innerText =
      JSON.stringify(fragmentQueryParameters, null, 2) +
      "\n\nExample Query\n" +
      `fetch("https://api.fitbit.com/1/user/-/activities/list.json?afterDate=2022-04-01&offset=0&limit=100&sort=asc", {
        headers: new Headers({
            Authorization: "Bearer " + fitbitAccessToken,
        }),
        mode: "cors",
        method: "GET",
    })`;
}


function start(evt) {
    evt.preventDefault();

    const clientId = document.querySelector("#clientId").value;
    const clientSecret = document.querySelector("#clientSecret").value;
    
    
    const publicUrl = encodeURIComponent(window.location.href);
    const scope = document.querySelector("#scopes").value.split(",").map(s => s.trim()).join(" ");
    
    
    const authUrl =
      "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&redirect_uri=" +
      publicUrl +
      "&scope=" + encodeURIComponent(scope);
    console.log(authUrl);
    window.location.replace(authUrl);
}