"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchData, University } from "@/service/data";

export default function List({ q }: { q: string }) {
  const [data, setData] = useState<University[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const mapPart = useCallback(
    (item: string, index: number) => (
      <span key={`${item}-${index}`}>
        {item.toLowerCase() === q.toLowerCase() ? <mark>{item}</mark> : item}
      </span>
    ),
    [q]
  );

  const mapUniversity = useCallback(
    (item: University) => {
      const key = `${item.alpha_two_code}-${item.name}`;
      const expression = new RegExp(`(${q})`, "i");
      const parts = item.name.split(expression).filter(Boolean);

      return (
        <li className="list-group-item" key={key}>
          {parts.map(mapPart)}
        </li>
      );
    },
    [mapPart, q]
  );

  useEffect(() => {
    if (q) {
      setLoading(true);
      setError(undefined);

      async function request() {
        try {
          const result = await fetchData({ q });

          setData(result);
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "Oops, something went wrong.";

          setError(message);
        } finally {
          setLoading(false);
        }
      }

      request();
    }
  }, [q]);

  if (q === "") {
    return (
      <div className="alert alert-light" role="alert">
        Please enter a search query.
      </div>
    );
  }

  if (loading) {
    return <ListSkeleton />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        Your search for <i>&quot;{q}&quot;</i> did not match any results.
      </div>
    );
  }

  return <ul className="list-group">{data?.map(mapUniversity)}</ul>;
}

export function ListSkeleton() {
  return (
    <ul className="list-group">
      {Array.from({ length: 5 }).map((_, index: number) => (
        <li className="list-group-item placeholder-glow" key={index}>
          <span
            className="placeholder"
            style={{ width: `${Math.floor(Math.random() * 75) + 25}%` }}
          />
        </li>
      ))}
    </ul>
  );
}
