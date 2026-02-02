// Function to remove empty queries
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shakeObject<DataT extends Record<string, any>>(
  data: DataT
): Partial<DataT> {
  const new_data = { ...data };
  const keys = Object.keys(new_data as object);
  keys?.forEach((key) => {
    if (!new_data[key] || new_data[key]?.value === "") {
      delete new_data[key];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (new_data as Record<string, any>)[key] =
        new_data[key]?.value || new_data[key];
    }
  });
  return new_data;
}

export default shakeObject;
