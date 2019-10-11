const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://en.wikipedia.org/wiki/List_of_theological_demons';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const demonList = $('li > a');
    const demonArray = [];
    const parentheses = / *\([^)]*\) */g;

    for (let i = 0, len = demonList.length; i < len; i++) {
      if (demonList[i].attribs.title && demonList[i].attribs.href) {
        const name = demonList[i].attribs.title.replace(parentheses, '');
        const url = demonList[i].attribs.href;
        name.length < 13
          ? demonArray.push({
              name,
              url
            })
          : console.log('Too big:', name);
      }
    }

    let data = JSON.stringify(demonArray);
    fs.writeFileSync('data/demonList.json', data);
  })
  .catch(console.error);
