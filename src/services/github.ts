export async function fetchGithubCommits(username: string): Promise<{ day: string; commitCount: number }[]> {
  const response = await fetch(`https://api.github.com/users/${username}/events`);

  if (response.status === 403) {
    throw new Error('GitHub API rate limit reached. Showing cached commit data.');
  }

  if (!response.ok) {
    throw new Error('Unable to fetch GitHub events right now.');
  }

  const events = (await response.json()) as any[];
  const byDay = new Map<string, number>();

  events
    .filter((event) => event.type === 'PushEvent')
    .forEach((event) => {
      const day = new Date(event.created_at).toISOString().slice(0, 10);
      const commits = event.payload?.commits?.length ?? 0;
      byDay.set(day, (byDay.get(day) ?? 0) + commits);
    });

  return Array.from(byDay.entries()).map(([day, commitCount]) => ({ day, commitCount }));
}
