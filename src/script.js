import { config } from "./config";
const apiKey = config.apiKey;

async function getCats() {
  try {
    //const cors = 'https://cors-anywhere.herokuapp.com/';
    const link = 'https://thecatapi.com/v1/images/search?limit=5';
    const request = await fetch(link, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      mode: 'cors'
    });
    if(request.ok) {
      const data = await request.json();
      //const data = await request;
      console.log(data);
    } else {
      throw new Error(request.statusText);
    }
  } catch (error) {
    console.log(error);
  }  
}

getCats();