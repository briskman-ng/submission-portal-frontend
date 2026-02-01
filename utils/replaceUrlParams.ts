const replaceUrlParams = (url: string, paramsMap: Record<string, string>) => {
  let replaced = url;

  const keys = Object.keys(paramsMap);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = paramsMap[key];

    replaced = replaced.replaceAll(`:${key}`, value);
  }

  return replaced;
};

export default replaceUrlParams;
