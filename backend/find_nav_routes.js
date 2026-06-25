const { createStrapi } = require('@strapi/strapi');

async function test() {
  console.log('Loading Strapi...');
  const instance = await createStrapi({ distDir: './dist' }).load();
  console.log('Strapi loaded.');
  
  const navPlugin = instance.plugin('navigation');
  if (navPlugin) {
    console.log('Navigation routes keys:', Object.keys(navPlugin.routes || {}));
    console.log('Navigation routes:', JSON.stringify(navPlugin.routes, null, 2));
  } else {
    console.log('Navigation plugin not found.');
  }

  process.exit(0);
}

test().catch(err => {
  console.error('Failed to run test:', err);
  process.exit(1);
});
