const fs = require('fs-extra');

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
    layout: layouts.find(layout => layout.name === page.layout).layout,
    page: page.page,
  }));

  const generateHtml = pagesAndLayouts.map(({ name, layout, page, data }) => ({
    html: layout({ content: page(data) }),
    name: name,
  }));

  await Promise.all(generateHtml.map(({ name, html }) => fs.writeFile(`./dist/${name}.html`, html)))
}

main();