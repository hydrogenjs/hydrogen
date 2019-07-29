const page = ({ title, text, dev }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <p>${text}</p>
    </body>
  </html>
`;

module.exports = {
  title: 'Hydrogen',
  page,
  data: () => ({
    text: 'Hydrogen: Static-site generator',
  }),
};
