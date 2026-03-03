import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GitHubInsights() {
  const username = "robbie-thomlinson";
  const [userStats, setUserStats] = useState<any>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    const octokit = new Octokit();
    octokit.rest.users
      .getByUsername({ username })
      .then(({ data }) => setUserStats(data))
      .catch(console.error);
    octokit.rest.repos
      .listForUser({ username, per_page: 100 })
      .then(({ data }) => {
        const stars = data.reduce(
          (sum, repo) => sum + (repo.stargazers_count || 0),
          0,
        );
        setTotalStars(stars);
      })
      .catch(console.error);
    octokit.rest.activity
      .listPublicEventsForUser({ username, per_page: 10 })
      .then(({ data }) => {
        console.log("Recent activity data:", data);
        setRecentActivity(data);
        setActivityLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching activity:", error);
        setActivityLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <GitHubCalendar username={username} />
      {userStats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-2xl font-bold">{userStats.public_repos}</h3>
            <p>Repositories</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-2xl font-bold">{userStats.followers}</h3>
            <p>Followers</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <h3 className="text-2xl font-bold">{totalStars}</h3>
            <p>Total Stars</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        {activityLoading ? (
          <p>Loading activity...</p>
        ) : recentActivity.length > 0 ? (
          <ul className="space-y-2">
            {recentActivity.map((event, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="font-medium">
                  {event.type.replace("Event", "")}
                </span>
                <span>in</span>
                <a
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {event.repo.name}
                </a>
                <span className="text-sm text-muted-foreground">
                  {new Date(event.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity.</p>
        )}
      </div>
    </div>
  );
}
