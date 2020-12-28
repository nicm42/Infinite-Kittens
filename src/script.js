const cats = document.querySelector('.cats');

async function getCats(limit) {
  try {
    //This needs a number for limit, otherwise it will only fetch one image
    const link = 'https://api.thecatapi.com/v1/images/search?limit=' + limit + '&mime_types=jpg,png';
    const request = await fetch(link);
    if(request.ok) {
      const data = await request.json();
      console.log(data);
      //return data;
      showCats(data);
    } else {
      throw new Error(request.statusText);
    }
  } catch (error) {
    console.log(error);
  }  
}

function showCats(data) {
  //Just want to add 10 of these for now - we'll add another 10 when the user scrolls
  //let catsCount = 0;
  //addCats(data, catsCount);
  data.forEach(cat => {
    const image = document.createElement('img');
    image.setAttribute('src', cat.url);
    cats.appendChild(image);
  })
}

//function addCats(data, catsCount) {
  /* for(let i = catsCount; i < catsCount + 10; i++) {
    const image = document.createElement('img');
    image.setAttribute('src', data[i].url);
    cats.appendChild(image);    
  } */
  /* catsCount += 10;
  if(catsCount >= data.length) {
    fisherYates(data);
  } */
//}

function fisherYates(array) {
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const observerOptions = {

}

const catsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    console.log(entry)
    if(entry.isIntersecting) {
      //Since it's intersecting on page load, we don't need to run getCats outside of here
      getCats(10);
    }
  })
}, observerOptions)

catsObserver.observe(cats);

//getCats(10)
  /* .then(data => {
    if(data) {
      showCats(data);
    }
  }); */