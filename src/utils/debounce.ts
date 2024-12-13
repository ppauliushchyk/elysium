import { useEffect, useState } from "react";

export function useDebounce(result: string, delay: number) {
  const [value, setValue] = useState(result);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(result);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [result, delay]);

  return value;
}
