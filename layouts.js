const defaultLayout = ({ content }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Static-site generator</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
`;

module.exports = {
  defaultLayout,
};