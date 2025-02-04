// =================================================
// ========= DEFAULT APP NAMES USED IN APP =========
// =================================================

const defaultNameInApp = () => ({
  // General app names
  appName: "NextJSBoilerplate",
});

export const defaultName = defaultNameInApp();

export type defaultNameType = (typeof defaultName)[keyof typeof defaultName];
