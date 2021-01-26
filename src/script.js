const cats = document.querySelector('.cats');
const helper = document.querySelector('.helper');

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
  data.forEach(cat => {
    const image = document.createElement('img');
    image.setAttribute('src', cat.url); //uncomment for API images
    //image.setAttribute('src', cat);
    image.setAttribute('alt', 'cat');
    cats.appendChild(image);
  })
}

const observerOptions = {
  root: null,
  rootMargin: "10%" //want to make sure more images load before getting to the bottom of the page
}

const catsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    //console.log(entry)
    //alert(entry)
    if(entry.isIntersecting) {
      //console.log('Loading cats')
      //Since it's intersecting on page load, we don't need to run getCats outside of here
      getCats(10); //uncomment for API images
      //const arr = ['1.106c6bd6.jpg','2.adddeb7c.jpg','3.993a564c.jpg','4.d8cb7558.jpg','5.044aff48.jpg','6.9baee97f.jpg','7.db0ddc3c.jpg','8.4d0a6fce.jpg','9.da115fa2.jpg','10.dd8e1232.jpg']
      //showCats(arr)
    }
  })
}, observerOptions)

catsObserver.observe(helper);