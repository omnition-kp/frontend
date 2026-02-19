import { AdminNavLinkItem } from "./admin-nav-link-item";

export interface AdminNavLinkProps extends AdminNavLinkItem {
    isActive: boolean;
    loading?: boolean;
}
