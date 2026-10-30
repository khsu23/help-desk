import { StatsPanel } from "../StatsPanel/StatsPanel";
import { RecentActivity } from "../RecentActivity/RecentActivity";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import type { DashboardStats } from "../../types/dashboard.types";
import type { Ticket } from "../../../tickets/types/ticket.types";
import axios from "axios";
import { LoadingSpinner } from "../../../../shared/components/LoadingSpinner/LoadingSpinner";

const API = "http://localhost:4000/api"
export function Dashboard() {
  // 🔴 TODO:
  // 1. Fetch GET /stats and GET /stats/recent with axios (base URL: http://localhost:4000/api)
  // 2. Display the stats and recent activity data (pass them to StatsPanel and RecentActivity)
  // 3. Handle loading and error states

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/stats`),
      axios.get(`${API}/stats/recent`),
    ]).then(([statsRes, recentRes]) => {
      setStats(statsRes.data)
      setRecent(recentRes.data)
    }).catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <LoadingSpinner />
  if (error || !stats) return <p>{error ?? "no data"}</p>

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <StatsPanel stats={stats} />
      <RecentActivity ticket={recent} />
    </div>
  );
}
