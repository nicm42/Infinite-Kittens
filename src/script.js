const cats = document.querySelector('.cats');

async function getCats() {
  try {
    //This needs a number for limit, otherwise it will only fetch one image
    const link = 'https://api.thecatapi.com/v1/images/search?limit=100&mime_types=jpg,png';
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
  //Just want to add 10 of these for now - we'll add another 10 when the user scrolls
  let catsCount = 0;
  addCats(data, catsCount);
  /* data.forEach(cat => {
    const image = document.createElement('img');
    image.setAttribute('src', cat.url);
    cats.appendChild(image);
  }) */
}

function addCats(data, catsCount) {
  for(let i = catsCount; i < catsCount + 10; i++) {
    const image = document.createElement('img');
    image.setAttribute('src', data[i].url);
    cats.appendChild(image);    
  }
  catsCount += 10;
}

getCats()
  .then(data => {
    if(data) {
      showCats(data);
    }
  });