const modulesContext = require.context(".", false, /\.js$/);
const modules = {};

/**
 * Auto-loads modules from /store/modules folder
 */
modulesContext.keys().forEach((moduleFile) => {
  if (moduleFile === "./index.js") return;

  const moduleName = moduleFile.replace(/(\.\/|\.js)/g, "");
  modules[moduleName] = modulesContext(moduleFile).default;
  modules[moduleName].namespaced = true;
});

export default modules;
