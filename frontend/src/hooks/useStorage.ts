import { useCallback, useState } from "react";

type UseStorage<T> = {
  read: () => T | null;
  write: (data: T) => void;
};

type UseStorageProps = {
  key: string;
};

const useStorage = <T>({ key }: UseStorageProps): UseStorage<T> => {
  const [data, setData] = useState<T | null>(() => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        if (typeof data !== "string" || typeof data !== "number") {
          return JSON.parse(data);
        }
        return data as T;
      } catch (error) {
        throw new Error(
          `Error parsing local storage data at key "${key}" during useStorage hook instantiation`
        );
      }
    }
    return data;
  });

  const read = useCallback<UseStorage<T>["read"]>(() => data, [data]);
  const write = useCallback<UseStorage<T>["write"]>(
    (data) => {
      if (typeof data !== "string" || typeof data !== "number") {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.setItem(key, data);
      }
      setData(() => data);
    },
    [key]
  );

  return { read, write };
};

export { useStorage };
