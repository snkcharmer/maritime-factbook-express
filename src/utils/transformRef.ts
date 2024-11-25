type TransformOptions = {
  references: string[];
  removeOriginal?: boolean;
};

export const transformReferences = <T extends Record<string, any>>(
  data: T | T[],
  options: TransformOptions
): T | T[] => {
  const { references, removeOriginal = true } = options;

  const transformObject = (obj: T): T => {
    references.forEach((ref) => {
      if (obj[ref]) {
        const key = ref.replace(/Id$/, '');

        (obj as any)[key] = obj[ref];
        if (removeOriginal) {
          delete obj[ref];
        }
      }
    });
    return obj;
  };

  if (Array.isArray(data)) {
    return data.map((item) => transformObject(item));
  }

  return transformObject(data);
};
