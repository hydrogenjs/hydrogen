const fs = require('fs-extra');

const checkIfDistExists = async () => {
  const exist = await new Promise((resolve, reject) => {
    fs.exists('./dist', (exist) => resolve(exist));
  });

  if (exist) {
    return false;
  }

  return fs.mkdir('./dist');
};

const main = async () => {
  const pages = await fs.readdir('./pages').then(pages => pages.map(page => ({
    name: page.split('.')[0],
    ...require(`./pages/${page}`),
  })));

  const layouts = await fs.readdir('./layouts').then(layouts => layouts.map(layout => ({
    name: layout.split('.')[0],
    layout: require(`./layouts/${layout}`),
  })));

  const pagesAndLayouts = pages.map(page => ({
    name: page.name,
    data: page.data,
    title: page.title,
    layout: layouts.find(layout => layout.name === page.layout).layout,
    page: page.page,
  }));

  const generateHtml = pagesAndLayouts.map(({ name, layout, page, data, title }) => ({
    html: layout({ content: page(data), title }),
    name: name,
  }));

  await checkIfDistExists();

  await Promise.all(generateHtml.map(({ name, html }) => fs.writeFile(`./dist/${name}.html`, html)));

  console.log('\nBuild complete!\n');
}

main();