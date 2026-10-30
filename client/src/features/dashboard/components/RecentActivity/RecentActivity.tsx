import { Link } from "react-router-dom";
import { StatusBadge } from "../../../../shared/components/Badges/Badges";
import styles from "./RecentActivity.module.css";
import { formatDate } from "../../../../shared/utils/formatters";
import type { Ticket } from "../../../tickets/types/ticket.types";

// 🔴 TODO: Accept tickets prop (Ticket[]) and render each ticket as a link with title, updated date, and status badge
export function RecentActivity({ticket}:{ticket:Ticket[]}) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Recent Activity</h2>
      <div className={styles.list}>
        {ticket.map((item)=>(
          <link key={item.id}
          className="style.item">
            <div>
              <div>
                <div>{item.title}</div>
              </div>

              <div>
                Updated {formatDate(item.updatedAt)}
              </div>
              <StatusBadge status="{item.status}"/>
            </div>
          </link>
        ))}
        <Link to="/tickets/1" className={styles.item}>
          <div className={styles.itemRow}>
            <div>
              <div className={styles.itemTitle}>
                Login page returns 500 error
              </div>
              <div className={styles.itemDate}>Updated Jun 17, 2026</div>
            </div>
            <StatusBadge status="open" />
          </div>
        </Link>
      </div>
    </div>
  );
}
