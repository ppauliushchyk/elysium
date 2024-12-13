"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import Input from "@/component/ui/Input";
import List from "@/component/ui/List";
import { useDebounce } from "@/utils/debounce";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [q, setQ] = useState<string>("");

  const debounceValue = useDebounce(value, 500);

  useEffect(() => {
    setQ(value);
  }, [debounceValue]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className="container">
      <div className="row py-4">
        <div className="col">
          <Input
            label="Start typing to search..."
            name="q"
            onChange={handleChange}
            placeholder="Start typing to search..."
            type="search"
            value={value}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <List q={q} />
        </div>
      </div>
    </div>
  );
}
