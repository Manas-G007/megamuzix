const clientId = 'fa98f605c623483da0ab9ac5176c9468';
const clientSecret = 'd16748c628f64588a318c29a60c162d8';


const getToken=async ()=>{
    const tokenUrl='https://accounts.spotify.com/api/token';
    const authHeader='Basic '+btoa(clientId+':'+clientSecret);
  
    const res=await fetch(tokenUrl,{
      method:'POST',
      headers:{
        'Authorization':authHeader,
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:'grant_type=client_credentials'
    })
  
    const data=await res.json();
    return data.access_token;
  };

function setText(text,n){
  return text.length>=n?`${text.substring(0,n-3)}...`:text;

}
function marText(text,n){
    return text.length>n?`<marquee>${text}</marquee>`:text;
}

function addComma(num){
  let n=num.length;
  let commaNum='';
  for(let i=0;i<n;i++){
    commaNum+=num[i];
    if((n-i-1)%3==0 && i!=n-1){
      commaNum+=`,`;
    }
  }
  return commaNum;
}