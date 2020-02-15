exports.beforeDistRemoved = async (ctx) => {};

exports.afterDistRemoved = async (ctx) => {};

exports.beforeBuild = async (ctx) => {};

exports.afterBuild = async (ctx) => {};

exports.beforeEachPageGenerated = async (ctx) => {};

exports.afterEachPageGenerated = async (ctx) => {};

exports.beforeServiceWorkerGenerated = async (ctx) => ({
  removeDefaults: true,
  inject: `
    const DEV = ${JSON.stringify(ctx.dev)}
  `,
});

exports.afterServiceWorkerGenerated = async (ctx) => {};
