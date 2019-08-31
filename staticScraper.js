const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/List_of_theological_demons';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const demonList = $('li > a');
    const demonArray = [];

    for (let i = 0, len = demonList.length; i < len; i++) {
      if (demonList[i].attribs.title && demonList[i].attribs.href) {
        const name = demonList[i].attribs.title;
        const url = demonList[i].attribs.href;

        demonArray.push({
          name,
          url
        });
        console.log('name:', name);
      } else {
        console.log('Not found');
      }
    }

    console.log(demonArray);
  })
  .catch(console.error);
