interface ContributorApiData {
  login: string;
  html_url: string;
  avatar_url: string;
}

export const getContributorsData = (): Promise<ContributorApiData[]> =>
  fetch(
    'https://api.github.com/repos/thisdot/starter.dev/contributors?anon=1'
  ).then((res) => res.json());
