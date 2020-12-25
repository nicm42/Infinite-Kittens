async function getCats() {
  try {
    const link = 'https://api.thecatapi.com/v1/images/search';
    const request = await fetch(link);
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