export type University = {
  alpha_two_code: string;
  country: string;
  domains: string[];
  name: string;
  web_pages: string[];
};

export async function fetchData({ q }: { q: string }): Promise<University[]> {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?name_contains=${q}`
    );

    if (!response.ok) {
      throw new Error(
        "We're unable to load the requested data at this time. Please try again later."
      );
    }

    const result = (await response.json()) as University[];

    return [...new Map(result.map((item) => [item.name, item])).values()];
  } catch {
    throw new Error("Oops, something went wrong.");
  }
}
