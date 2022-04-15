// If user hasn't authed with Fitbit, redirect to Fitbit OAuth Implicit Grant Flow
const url = window.location.origin + window.location.pathname;
const params = Object.fromEntries( new URLSearchParams(window.location.search).entries());

if (!params.code) {
    document.querySelector("#output").style.display = `none`;
    document.querySelector("#start").addEventListener("click", start);
    populateForm();
}else{
    document.querySelector("#input").style.display = `none`;
    console.log(params);
    document.querySelector("#access_token").value = params.code;
    const state = JSON.parse(localStorage.getItem("state"));
    document.querySelector("#outputjson").value = JSON.stringify(
        {code: params.code, ...state, redirect_uri: url},null,2);
}

function populateForm() {
    const state = JSON.parse(localStorage.getItem("state"));
    document.querySelector("#redUrl").value = url;
    if (state) {
        document.querySelector("#client_id").value = state.client_id;
        document.querySelector("#client_secret").value = state.client_secret;
        document.querySelector("#scopes").value = state.scope;
    } else {
        document.querySelector("#scopes").value = "activity profile heartrate";
    }
}

async function start(evt) {
    evt.preventDefault();

    const client_id = document.querySelector("#client_id").value;
    const client_secret = document.querySelector("#client_secret").value;
    
    
    const publicUrl = encodeURIComponent(window.location.href);
    const scope = document.querySelector("#scopes").value.split(",").map(s => s.trim()).join(" ");
    
    //const {codeVerifier, codeChallenge} = await generateId(50);
    
    localStorage.setItem("state", JSON.stringify({client_id, client_secret, scope}));

    const authUrl =
      "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&redirect_uri=" +
      publicUrl +
      "&scope=" + encodeURIComponent(scope);
      //+ "&code_challenge_method=S256&code_challenge=" + codeChallenge;
    console.log(authUrl);
    window.location.replace(authUrl);
}