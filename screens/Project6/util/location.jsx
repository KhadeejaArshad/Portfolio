const GOOGLE_API_KEY = 'AIzaSyCk1RD6edvLjsdifV-WvCPQ9yHx_voBSd4';

export function getMapPreview(lat,lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}
&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}

export async function getAddress(lat,lng){
  const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response=await fetch(url);
  if(!response.ok){
    throw new Error('Failed to fetch address!')
  }
  console.log(response);
  
  const data=await response.json();
  console.log(data);
  
  const address=data.results[0].formatted_address;
  return address
  
  


}