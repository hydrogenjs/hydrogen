exports.beforeDistRemoved = async (ctx) => {
  // console.log(ctx);
};

exports.afterDistRemoved = async (ctx) => {
  // console.log(ctx);
};

exports.beforeBuild = async (ctx) => {
  // console.log(ctx);
};

exports.afterBuild = async (ctx) => {
  // console.log(ctx);
};

exports.beforeEachPage = async (ctx) => {
  console.log(ctx.page.path);
};

exports.afterEachPage = async (ctx) => {
  // console.log(ctx);
};

exports.beforeServiceWorkerGenerated = async (ctx) => {
  // console.log(ctx);
};

exports.afterServiceWorkerGenerated = async (ctx) => {
  // console.log(ctx);
};
