// Standardizing barrel exports with lowercase facade extensions
/* Fixed: Standardizing casing: using lowercase facades to prevent casing conflicts with root files */
import Navbar from "../landing/navbar.tsx";
import { Footer } from "./footer.tsx";
import SidebarDashboard from "./sidebar-dashboard.tsx";

export { Navbar, Footer, SidebarDashboard };