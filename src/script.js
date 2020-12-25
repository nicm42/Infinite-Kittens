async function getCats() {
  try {
    //This needs a number for limit, otherwise it will only fetch one image
    const link = 'https://api.thecatapi.com/v1/images/search?limit=100';
    const request = await fetch(link);
    if(request.ok) {
      const data = await request.json();
      //console.log(data);
      return data;
    } else {
      throw new Error(request.statusText);
    }
  } catch (error) {
    console.log(error);
  }  
}

function showCats(data) {
  console.log(data[0].url);
  const cats = document.querySelector('.cats');
  const image = document.createElement('img');
  image.setAttribute('src', data[0].url);
  cats.appendChild(image);
}

getCats()
  .then(data => {
    if(data) {
      showCats(data);
    }
  });