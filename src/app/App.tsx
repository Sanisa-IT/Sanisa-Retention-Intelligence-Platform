import React, { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router";
import {
  LayoutDashboard,
  Users,
  MessageSquareWarning,
  AlertTriangle,
  Zap,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowUpRight,
  Minus,
  Shield,
  Flame,
  MoreHorizontal,
  Star,
  CalendarDays,
  Activity,
  BadgeAlert,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const retentionTrendData = [
  { month: "Jan", rate: 78, recovered: 12 },
  { month: "Feb", rate: 75, recovered: 15 },
  { month: "Mar", rate: 72, recovered: 18 },
  { month: "Apr", rate: 79, recovered: 22 },
  { month: "May", rate: 81, recovered: 28 },
  { month: "Jun", rate: 82, recovered: 32 },
  { month: "Jul", rate: 80, recovered: 30 },
  { month: "Aug", rate: 84, recovered: 38 },
];

const churnData = [
  { name: "High Risk", value: 12, color: "#ef4444" },
  { name: "Medium Risk", value: 33, color: "#f59e0b" },
  { name: "Low Risk", value: 55, color: "#10b981" },
];

const complaints = [
  { id: "#1287", title: "Internet not working", priority: "High", status: "Open", customer: "John D.", time: "2h ago", category: "Technical", agent: "Unassigned", notes: "Router reboot did not resolve. ISP ticket raised." },
  { id: "#1286", title: "Billing Incorrect", priority: "Medium", status: "In Progress", customer: "Sarah K.", time: "4h ago", category: "Billing", agent: "Tom R.", notes: "Duplicate charge identified. Refund processing." },
  { id: "#1285", title: "Poor Service", priority: "High", status: "Open", customer: "Michael T.", time: "6h ago", category: "Service", agent: "Unassigned", notes: "Customer escalated after three failed callbacks." },
  { id: "#1284", title: "App Not Working", priority: "Low", status: "Resolved", customer: "Aisha M.", time: "8h ago", category: "Technical", agent: "Dev Team", notes: "Cache clear resolved the issue. Follow-up scheduled." },
  { id: "#1283", title: "Slow connection speeds", priority: "Low", status: "Resolved", customer: "Priya S.", time: "1d ago", category: "Technical", agent: "Tom R.", notes: "Line test completed. Speed confirmed back to SLA." },
  { id: "#1282", title: "Cancellation request", priority: "High", status: "In Progress", customer: "Marc B.", time: "1d ago", category: "Retention", agent: "Sarah Admin", notes: "Retention offer extended. Awaiting customer decision." },
  { id: "#1281", title: "Login access denied", priority: "Medium", status: "Open", customer: "Lena W.", time: "2d ago", category: "Technical", agent: "Dev Team", notes: "Account locked after 5 failed attempts. Reset pending." },
  { id: "#1280", title: "Service outage — no signal", priority: "High", status: "In Progress", customer: "Oscar F.", time: "2d ago", category: "Technical", agent: "Network Ops", notes: "Regional outage confirmed. ETA restoration: 4h." },
  { id: "#1279", title: "Wrong plan charged", priority: "Medium", status: "Resolved", customer: "Fatima A.", time: "3d ago", category: "Billing", agent: "Tom R.", notes: "Plan corrected and prorated refund issued." },
  { id: "#1278", title: "Equipment not delivered", priority: "High", status: "Open", customer: "Daniel O.", time: "3d ago", category: "Logistics", agent: "Unassigned", notes: "Tracking shows stuck at depot for 5 days." },
];

const customers = [
  {
    id: "C001", name: "John Doe", initials: "JD", email: "john.doe@email.com", phone: "+44 7700 900123",
    plan: "Business Pro", mrr: 299, since: "Jan 2023", score: 32, risk: "High", complaints: 3,
    lastInteraction: "2 days ago", gradient: "from-indigo-500 to-violet-600",
    timeline: [
      { date: "Jun 24", event: "Complaint #1287 opened — internet outage" },
      { date: "Jun 20", event: "Retention offer declined by customer" },
      { date: "Jun 12", event: "Support call — issue unresolved" },
      { date: "May 30", event: "Billing dispute raised" },
      { date: "May 10", event: "Onboarding call completed" },
    ],
    notes: "Customer frustrated with repeated billing errors and service outages. Escalate to senior CX rep before next contact.",
    riskFactors: ["3 unresolved complaints in 60 days", "Negative sentiment in last 2 contacts", "Payment delayed — overdue by 12 days", "Usage dropped 40% vs prior quarter", "No response to retention offer (May)"],
    actions: ["Offer apology + Service Fix", "Provide 20% discount coupon", "Follow up in 48 hours"],
  },
  {
    id: "C002", name: "Sarah Kim", initials: "SK", email: "sarah.kim@techcorp.io", phone: "+44 7800 112233",
    plan: "Enterprise", mrr: 899, since: "Mar 2022", score: 61, risk: "Medium", complaints: 1,
    lastInteraction: "4 hours ago", gradient: "from-rose-500 to-pink-600",
    timeline: [
      { date: "Jun 26", event: "Billing complaint #1286 raised" },
      { date: "Jun 15", event: "Quarterly review call — positive" },
      { date: "Apr 02", event: "Plan upgraded to Enterprise" },
    ],
    notes: "Long-standing enterprise customer. Billing issue is isolated. High value — prioritise fast resolution.",
    riskFactors: ["1 open billing complaint", "Billing agent response time exceeded SLA"],
    actions: ["Issue refund within 24h", "Send personalised apology", "Schedule quarterly check-in"],
  },
  {
    id: "C003", name: "Michael Torres", initials: "MT", email: "m.torres@mail.com", phone: "+44 7911 445566",
    plan: "Standard", mrr: 79, since: "Aug 2023", score: 28, risk: "High", complaints: 2,
    lastInteraction: "6 hours ago", gradient: "from-orange-500 to-red-500",
    timeline: [
      { date: "Jun 25", event: "Complaint #1285 — poor service quality" },
      { date: "Jun 18", event: "Called support 3 times — no resolution" },
      { date: "Jun 01", event: "First complaint logged" },
    ],
    notes: "Escalated twice with no resolution. At risk of churn. Assign senior agent immediately.",
    riskFactors: ["2 complaints in 30 days", "3 unanswered callback requests", "CSAT score: 1/5 on last interaction"],
    actions: ["Senior agent callback within 2h", "Offer service credit", "Log as priority retention case"],
  },
  {
    id: "C004", name: "Aisha Mensah", initials: "AM", email: "aisha.m@home.net", phone: "+44 7733 667788",
    plan: "Standard", mrr: 49, since: "Nov 2023", score: 84, risk: "Low", complaints: 1,
    lastInteraction: "8 hours ago", gradient: "from-teal-500 to-emerald-600",
    timeline: [
      { date: "Jun 24", event: "App issue resolved — #1284 closed" },
      { date: "Jun 23", event: "App complaint raised" },
      { date: "Dec 01", event: "Account activated" },
    ],
    notes: "Issue resolved quickly. Customer expressed satisfaction post-resolution. Low churn risk.",
    riskFactors: [],
    actions: ["Send satisfaction survey", "Offer loyalty reward"],
  },
  {
    id: "C005", name: "Oscar Fernandez", initials: "OF", email: "o.fernandez@biz.es", phone: "+44 7855 990011",
    plan: "Business Pro", mrr: 299, since: "Feb 2022", score: 41, risk: "Medium", complaints: 2,
    lastInteraction: "2 days ago", gradient: "from-blue-500 to-cyan-600",
    timeline: [
      { date: "Jun 27", event: "Outage complaint #1280 raised" },
      { date: "Jun 10", event: "Network degradation reported" },
      { date: "Mar 15", event: "Plan renewed for 12 months" },
    ],
    notes: "Affected by regional outage. Proactive communication sent. Monitor until restoration confirmed.",
    riskFactors: ["2 network complaints in 90 days", "Outage ongoing — ETA 4h"],
    actions: ["Send outage update proactively", "Apply service credit", "Follow up post-resolution"],
  },
  {
    id: "C006", name: "Priya Sharma", initials: "PS", email: "priya.s@startup.in", phone: "+44 7622 334455",
    plan: "Standard", mrr: 79, since: "May 2023", score: 77, risk: "Low", complaints: 1,
    lastInteraction: "1 day ago", gradient: "from-violet-500 to-purple-600",
    timeline: [
      { date: "Jun 23", event: "Speed complaint #1283 resolved" },
      { date: "Jun 22", event: "Line test performed" },
      { date: "May 01", event: "Account created" },
    ],
    notes: "Resolved promptly. Happy with outcome per CSAT. Continue monitoring line stability.",
    riskFactors: ["One prior speed complaint — monitor"],
    actions: ["Schedule line stability check in 2 weeks"],
  },
];

const atRiskCustomers = customers.filter((c) => c.risk === "High" || c.risk === "Medium");

// ─── Shared Components ────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: "bg-red-500/15 text-red-400 border border-red-500/20",
    Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    Low: "bg-slate-500/15 text-slate-400 border border-slate-500/25",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide ${map[priority] ?? ""}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Open: "bg-blue-500/15 text-blue-400",
    "In Progress": "bg-indigo-500/15 text-indigo-400",
    Resolved: "bg-emerald-500/15 text-emerald-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${map[status] ?? ""}`}>
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const map: Record<string, string> = {
    High: "bg-red-500/15 text-red-400 border border-red-500/25",
    Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
    Low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  };
  const icons: Record<string, React.ReactNode> = {
    High: <Flame className="size-2.5" />,
    Medium: <BadgeAlert className="size-2.5" />,
    Low: <CheckCircle2 className="size-2.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${map[risk] ?? ""}`}>
      {icons[risk]} {risk} Risk
    </span>
  );
}

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const color = score >= 70 ? "#10b981" : score >= 45 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${(score / 100) * circ} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-bold leading-none" style={{ fontSize: size * 0.25, color }}>{score}</span>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, trend, accent }: { label: string; value: string; sub?: string; trend?: "up" | "down" | "flat"; accent?: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
      <div className="flex items-end gap-2">
        <span className="font-mono text-2xl font-semibold leading-none" style={{ color: accent ?? "#e8eaf0" }}>{value}</span>
        {trend === "up" && <TrendingUp className="size-4 text-emerald-400 mb-0.5" />}
        {trend === "down" && <TrendingDown className="size-4 text-red-400 mb-0.5" />}
        {trend === "flat" && <Minus className="size-4 text-slate-500 mb-0.5" />}
      </div>
      {sub && <span className="text-[11px] text-muted-foreground font-mono">{sub}</span>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg p-3 text-xs font-mono shadow-xl">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}{p.dataKey === "rate" ? "%" : ""}</p>
      ))}
    </div>
  );
};

// ─── Nav config ──────────────────────────────────────────────────────────────

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: Users, label: "Customers", to: "/customers" },
  { icon: MessageSquareWarning, label: "Complaints", to: "/complaints", badge: complaints.filter((c) => c.status === "Open").length },
  { icon: AlertTriangle, label: "At-Risk", to: "/at-risk" },
];

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "CX Overview", subtitle: "Retention Intelligence Platform" },
  "/customers": { title: "Customer Profiles", subtitle: `${customers.length} customers · ${customers.filter((c) => c.risk === "High").length} high risk` },
  "/complaints": { title: "Complaints & Issues", subtitle: `${complaints.length} cases · ${complaints.filter((c) => c.status === "Open").length} open` },
  "/at-risk": { title: "Retention Intelligence", subtitle: `${atRiskCustomers.length} customers requiring attention` },
};

// ─── Layout ──────────────────────────────────────────────────────────────────

function Layout() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? { title: "Sanisa", subtitle: "" };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-[200px] shrink-0 flex flex-col border-r border-border h-full" style={{ background: "var(--sidebar)" }}>
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <div className="size-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <Shield className="size-4 text-white" />
          </div>
          <span className="font-semibold text-sm text-foreground tracking-tight">sanisa</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, to, badge }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {({ isActive }) => (
                <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors group cursor-pointer ${isActive ? "bg-sidebar-accent text-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"}`}>
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-foreground"}`} />
                  <span className="flex-1">{label}</span>
                  {badge != null && badge > 0 && (
                    <span className="text-[10px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">{badge}</span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors">
            <div className="size-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">SA</div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate">Sarah Admin</p>
              <p className="text-[10px] text-muted-foreground truncate font-mono">CX Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        <header className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-border">
          <div>
            <h1 className="text-[15px] font-semibold text-foreground leading-none">{meta.title}</h1>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{meta.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 border border-border">
              <Search className="size-3.5 text-muted-foreground" />
              <input placeholder="Search…" className="bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none w-40 font-mono" />
            </div>
            <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
              <Bell className="size-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const navigate = useNavigate();

  const filteredComplaints = complaints.filter((c) => {
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchPriority = priorityFilter === "All Priority" || c.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  const [activeTab, setActiveTab] = useState("Overview");
  const customerTabs = ["Overview", "Complaints", "Timeline", "Notes"];

  const riskFactors = [
    "3 unresolved complaints in 60 days",
    "Negative sentiment in last 2 contacts",
    "Payment delayed — overdue by 12 days",
    "Usage dropped 40% vs prior quarter",
    "No response to retention offer (May)",
  ];

  const recoverySteps = [
    { icon: AlertCircle, label: "Issue Detection", desc: "Complaint received & logged", status: "done" },
    { icon: Zap, label: "Automated Response", desc: "Apology sent · Case created", status: "done" },
    { icon: CheckCircle2, label: "Resolution", desc: "Issue resolved by support", status: "active" },
    { icon: Circle, label: "Follow Up", desc: "Customer satisfaction check", status: "pending" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
        <KpiCard label="At-Risk Customers" value="12,540" sub="↑ 340 from last month" trend="down" accent="#ef4444" />
        <KpiCard label="Retention Rate" value="82%" sub="↑ 2.1% vs prior period" trend="up" accent="#10b981" />
        <KpiCard label="Cases Open" value="1,204" sub="94 escalated · critical" trend="down" accent="#f59e0b" />
        <KpiCard label="Recovered" value="324" sub="This month · +18% MoM" trend="up" accent="#6366f1" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Churn Risk Distribution</h3>
            <span className="text-[10px] text-muted-foreground font-mono">Live</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <PieChart width={140} height={140}>
                <Pie data={churnData} cx={65} cy={65} innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value" strokeWidth={0}>
                  {churnData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-mono text-xl font-bold text-foreground leading-none">1,904</span>
                <span className="text-[9px] text-muted-foreground font-mono mt-0.5">at-risk</span>
              </div>
            </div>
            <div className="space-y-2.5 flex-1">
              {churnData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="size-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] text-muted-foreground flex-1 font-mono">{d.name}</span>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: d.color }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Retention Trend</h3>
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-indigo-400 rounded" />Rate %</span>
              <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-emerald-400 rounded" />Recovered</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={retentionTrendData} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="rate" name="Retention Rate" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: "#6366f1" }} />
              <Line type="monotone" dataKey="recovered" name="Recovered" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-3">
        {/* Complaints widget */}
        <div className="col-span-4 bg-card border border-border rounded-lg flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Complaints & Issues</h3>
            <button onClick={() => navigate("/complaints")} className="text-primary text-[11px] font-mono hover:underline flex items-center gap-0.5">
              View all <ArrowUpRight className="size-3" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-[10px] font-mono bg-muted border border-border rounded px-2 py-1 text-foreground outline-none cursor-pointer">
              {["All Status", "Open", "In Progress", "Resolved"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="text-[10px] font-mono bg-muted border border-border rounded px-2 py-1 text-foreground outline-none cursor-pointer">
              {["All Priority", "High", "Medium", "Low"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filteredComplaints.map((c) => (
              <div key={c.id} className="px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors group">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{c.id}</span>
                    <span className="text-[12px] font-medium text-foreground truncate">{c.title}</span>
                  </div>
                  <ChevronRight className="size-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <PriorityBadge priority={c.priority} />
                  <StatusBadge status={c.status} />
                  <span className="text-[10px] font-mono text-muted-foreground ml-auto">{c.time}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-1.5">{c.customer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Profile widget */}
        <div className="col-span-5 flex flex-col gap-3">
          <div className="bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
              <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Customer Profile</h3>
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <MoreHorizontal className="size-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[13px] font-bold text-white shrink-0">JD</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-foreground">John Doe</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-500/15 text-red-400 border border-red-500/25">
                    <Flame className="size-2.5" /> High Risk
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Mail className="size-2.5" />john.doe@email.com</span>
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Phone className="size-2.5" />+44 7700 900123</span>
                </div>
              </div>
            </div>
            <div className="flex items-center border-b border-border px-4">
              {["Overview", "Complaints", "Timeline", "Notes"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-medium py-2.5 px-3 border-b-2 transition-colors font-mono ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="px-4 py-3">
              {activeTab === "Overview" && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    { label: "Customer Since", value: "Jan 2023" },
                    { label: "Total Complaints", value: "3" },
                    { label: "Retention Score", value: "32 / 100" },
                    { label: "Last Interaction", value: "2 days ago" },
                    { label: "Plan", value: "Business Pro" },
                    { label: "MRR", value: "$299 / mo" },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">{row.label}</span>
                      <span className="text-[12px] font-medium text-foreground font-mono">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Complaints" && (
                <div className="space-y-2">
                  {complaints.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-muted-foreground">{c.id}</span>
                      <span className="text-foreground flex-1 truncate">{c.title}</span>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Timeline" && (
                <div className="space-y-3">
                  {[
                    { date: "Jun 24", event: "Complaint #1287 opened" },
                    { date: "Jun 20", event: "Retention offer declined" },
                    { date: "Jun 12", event: "Support call — unresolved" },
                  ].map((e) => (
                    <div key={e.date} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-muted-foreground w-12 shrink-0">{e.date}</span>
                      <span className="text-[11px] font-mono text-foreground">{e.event}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Notes" && (
                <p className="text-[11px] font-mono text-muted-foreground italic">Customer frustrated with repeated billing errors. Escalate to senior CX rep.</p>
              )}
            </div>
          </div>

          {/* Retention Intelligence widget */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Retention Intelligence</h3>
              <span className="text-[10px] font-mono text-muted-foreground">AI-powered</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative size-16">
                  <svg viewBox="0 0 64 64" className="size-full -rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#ef4444" strokeWidth="6"
                      strokeDasharray={`${(32 / 100) * 163.4} 163.4`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-base font-bold text-foreground leading-none">32</span>
                    <span className="text-[8px] font-mono text-muted-foreground">/100</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-red-400 font-semibold uppercase tracking-wide">High Risk</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-2">Risk Factors</p>
                <ul className="space-y-1.5">
                  {riskFactors.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[11px] font-mono text-foreground">
                      <span className="text-red-400 shrink-0 mt-0.5">▸</span>{f}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-1.5">Recommended Action</p>
                  <ul className="space-y-1">
                    {["Offer apology + Service Fix", "Provide 20% discount coupon", "Follow up in 48 hours"].map((a) => (
                      <li key={a} className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-300">
                        <CheckCircle2 className="size-3 text-indigo-400 shrink-0" />{a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Recovery widget */}
        <div className="col-span-3 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">Service Recovery</h3>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">In Progress</span>
          </div>
          <div className="relative flex flex-col gap-0">
            {recoverySteps.map((step, i) => {
              const Icon = step.icon;
              const isDone = step.status === "done";
              const isActive = step.status === "active";
              const isPending = step.status === "pending";
              return (
                <div key={step.label} className="flex gap-3 relative">
                  {i < recoverySteps.length - 1 && (
                    <div className="absolute left-[14px] top-7 bottom-0 w-px" style={{ background: isDone ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)" }} />
                  )}
                  <div className={`size-7 rounded-full flex items-center justify-center shrink-0 z-10 ${isDone ? "bg-indigo-500/20 border border-indigo-500/40" : isActive ? "bg-amber-500/20 border border-amber-500/50" : "bg-muted border border-border"}`}
                    style={{ boxShadow: isActive ? "0 0 12px rgba(245,158,11,0.2)" : undefined }}>
                    <Icon className="size-3.5" style={{ color: isDone ? "#6366f1" : isActive ? "#f59e0b" : "#475569" }} />
                  </div>
                  <div className="pb-5 flex-1 min-w-0">
                    <p className={`text-[12px] font-semibold font-mono leading-none ${isPending ? "text-muted-foreground" : "text-foreground"}`}>{step.label}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1">{step.desc}</p>
                    {isDone && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-mono text-emerald-400 uppercase tracking-wide"><CheckCircle2 className="size-2.5" />Complete</span>}
                    {isActive && <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-wide"><Clock className="size-2.5" />Active</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 pt-3 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors">
              <Zap className="size-3.5" />Trigger Resolution Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Complaints Page ──────────────────────────────────────────────────────────

type Complaint = typeof complaints[0];

function ComplaintsPage() {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [selected, setSelected] = useState<Complaint | null>(null);

  const filtered = complaints.filter((c) => {
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchPriority = priorityFilter === "All Priority" || c.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  const openCount = complaints.filter((c) => c.status === "Open").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden border-r border-border">
        <div className="shrink-0 flex items-center gap-6 px-6 py-3 border-b border-border bg-muted/30">
          {[
            { label: "Open", count: openCount, color: "text-blue-400" },
            { label: "In Progress", count: inProgressCount, color: "text-indigo-400" },
            { label: "Resolved", count: resolvedCount, color: "text-emerald-400" },
            { label: "Total", count: complaints.length, color: "text-foreground" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className={`font-mono text-lg font-semibold leading-none ${s.color}`}>{s.count}</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="shrink-0 flex items-center gap-2 px-6 py-3 border-b border-border">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[11px] font-mono bg-muted border border-border rounded-md px-3 py-1.5 text-foreground outline-none cursor-pointer hover:border-primary/40 transition-colors">
            {["All Status", "Open", "In Progress", "Resolved"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-[11px] font-mono bg-muted border border-border rounded-md px-3 py-1.5 text-foreground outline-none cursor-pointer hover:border-primary/40 transition-colors">
            {["All Priority", "High", "Medium", "Low"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground font-mono text-[12px]">No complaints match the current filters.</div>
          )}
          {filtered.map((c) => (
            <button key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className={`w-full text-left px-6 py-4 hover:bg-muted/40 transition-colors group border-l-2 ${selected?.id === c.id ? "bg-muted/60 border-l-primary" : "border-l-transparent"}`}>
              <div className="flex items-start gap-4">
                <span className="text-[11px] font-mono text-muted-foreground w-12 shrink-0 pt-0.5">{c.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground leading-snug">{c.title}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <PriorityBadge priority={c.priority} />
                    <span className="text-muted-foreground text-[10px] font-mono">•</span>
                    <StatusBadge status={c.status} />
                    <span className="text-muted-foreground text-[10px] font-mono">•</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{c.category}</span>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1.5">Customer: {c.customer}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground">{c.time}</span>
                  <ChevronRight className={`size-4 transition-colors ${selected?.id === c.id ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="w-[340px] shrink-0 flex flex-col overflow-hidden">
        {selected ? (
          <>
            <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-border">
              <span className="text-[11px] font-mono text-muted-foreground">Case {selected.id}</span>
              <button onClick={() => setSelected(null)} className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors">Close ✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h2 className="text-[15px] font-semibold text-foreground leading-snug">{selected.title}</h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <PriorityBadge priority={selected.priority} />
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: "Customer", value: selected.customer },
                  { label: "Category", value: selected.category },
                  { label: "Assigned To", value: selected.agent },
                  { label: "Logged", value: selected.time },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">{row.label}</p>
                    <p className="text-[12px] font-mono text-foreground font-medium">{row.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">Case Notes</p>
                <p className="text-[12px] font-mono text-foreground leading-relaxed bg-muted/50 rounded-md px-3 py-2.5 border border-border">{selected.notes}</p>
              </div>
              <div className="space-y-2 pt-1">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Actions</p>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors">
                  <Zap className="size-3.5" />Assign &amp; Escalate
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="size-3.5" />Mark Resolved
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center">
              <MessageSquareWarning className="size-5 text-muted-foreground" />
            </div>
            <p className="text-[12px] font-mono text-muted-foreground leading-relaxed">Select a complaint to view details and take action.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Customer Profile Page ────────────────────────────────────────────────────

type Customer = typeof customers[0];

function CustomerProfilePage() {
  const [selected, setSelected] = useState<Customer>(customers[0]);
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Complaints", "Timeline", "Notes"];

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-[260px] shrink-0 flex flex-col border-r border-border overflow-hidden">
        <div className="shrink-0 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 border border-border">
            <Search className="size-3 text-muted-foreground" />
            <input placeholder="Filter customers…" className="bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground outline-none flex-1 font-mono" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {customers.map((c) => (
            <button key={c.id} onClick={() => { setSelected(c); setTab("Overview"); }}
              className={`w-full text-left px-4 py-3.5 hover:bg-muted/40 transition-colors border-l-2 ${selected.id === c.id ? "bg-muted/50 border-l-primary" : "border-l-transparent"}`}>
              <div className="flex items-center gap-3">
                <div className={`size-8 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-foreground truncate">{c.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">{c.plan} · ${c.mrr}/mo</p>
                </div>
                <ScoreRing score={c.score} size={32} />
              </div>
              <div className="mt-2 ml-11"><RiskBadge risk={c.risk} /></div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-4 px-6 py-4 border-b border-border">
          <div className={`size-12 rounded-full bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-[15px] font-bold text-white shrink-0`}>{selected.initials}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-[16px] font-semibold text-foreground">{selected.name}</h2>
              <RiskBadge risk={selected.risk} />
            </div>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1"><Mail className="size-3" />{selected.email}</span>
              <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1"><Phone className="size-3" />{selected.phone}</span>
            </div>
          </div>
          <ScoreRing score={selected.score} size={52} />
        </div>

        <div className="shrink-0 flex items-center border-b border-border px-6">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-[11px] font-medium font-mono py-2.5 px-3 border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "Overview" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 grid grid-cols-3 gap-3">
                {[
                  { label: "Customer Since", value: selected.since, icon: CalendarDays },
                  { label: "Plan", value: selected.plan, icon: Star },
                  { label: "MRR", value: `$${selected.mrr}/mo`, icon: TrendingUp },
                  { label: "Total Complaints", value: String(selected.complaints), icon: MessageSquareWarning },
                  { label: "Retention Score", value: `${selected.score} / 100`, icon: Activity },
                  { label: "Last Interaction", value: selected.lastInteraction, icon: Clock },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-muted/40 border border-border rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Icon className="size-3 text-muted-foreground" />
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
                    </div>
                    <p className="text-[13px] font-mono font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-muted/40 border border-border rounded-lg p-4 flex flex-col gap-3">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Risk Summary</p>
                <div className="flex justify-center"><ScoreRing score={selected.score} size={72} /></div>
                {selected.riskFactors.length > 0 ? (
                  <ul className="space-y-1.5">
                    {selected.riskFactors.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[10px] font-mono text-foreground">
                        <span className="text-red-400 shrink-0">▸</span>{f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[10px] font-mono text-emerald-400">No active risk factors.</p>
                )}
              </div>
              {selected.actions.length > 0 && (
                <div className="col-span-3 bg-muted/40 border border-border rounded-lg p-4">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Lightbulb className="size-3 text-amber-400" />Recommended Actions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.actions.map((a) => (
                      <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                        <CheckCircle2 className="size-3 text-indigo-400 shrink-0" />{a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {tab === "Complaints" && (
            <div className="space-y-2">
              {complaints.filter((c) =>
                selected.name.toLowerCase().split(" ").some((part) => c.customer.toLowerCase().includes(part.charAt(0)))
              ).slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3 bg-muted/30 border border-border rounded-lg">
                  <span className="text-[10px] font-mono text-muted-foreground w-10 shrink-0">{c.id}</span>
                  <span className="text-[12px] font-medium text-foreground flex-1 truncate">{c.title}</span>
                  <PriorityBadge priority={c.priority} />
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          )}
          {tab === "Timeline" && (
            <div className="relative space-y-0">
              {selected.timeline.map((e, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < selected.timeline.length - 1 && <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />}
                  <div className="size-5 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 z-10 mt-0.5">
                    <span className="size-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="pb-5 flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-muted-foreground">{e.date}</span>
                    <p className="text-[12px] font-mono text-foreground mt-0.5">{e.event}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "Notes" && (
            <div className="max-w-xl">
              <div className="bg-muted/40 border border-border rounded-lg px-4 py-3">
                <p className="text-[12px] font-mono text-foreground leading-relaxed">{selected.notes}</p>
              </div>
              <button className="mt-3 text-[11px] font-mono text-primary hover:underline flex items-center gap-1">
                <Zap className="size-3" />Add note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Retention Intelligence Page ──────────────────────────────────────────────

function RetentionIntelligencePage() {
  const [selected, setSelected] = useState<Customer>(atRiskCustomers[0]);
  const avgScore = Math.round(atRiskCustomers.reduce((s, c) => s + c.score, 0) / atRiskCustomers.length);
  const highCount = atRiskCustomers.filter((c) => c.risk === "High").length;
  const medCount = atRiskCustomers.filter((c) => c.risk === "Medium").length;

  const recoveryFlow = [
    { icon: AlertCircle, label: "Issue Detection", desc: "Complaint received & logged" },
    { icon: Zap, label: "Automated Response", desc: "Apology sent · Case created" },
    { icon: CheckCircle2, label: "Resolution", desc: "Issue resolved by support" },
    { icon: Circle, label: "Follow Up", desc: "Customer satisfaction check" },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-[280px] shrink-0 flex flex-col border-r border-border overflow-hidden">
        <div className="shrink-0 px-4 py-3 border-b border-border space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "At-Risk", value: atRiskCustomers.length, color: "text-foreground" },
              { label: "High", value: highCount, color: "text-red-400" },
              { label: "Medium", value: medCount, color: "text-amber-400" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-md p-2 text-center border border-border">
                <p className={`font-mono font-bold text-base leading-none ${s.color}`}>{s.value}</p>
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
            <span>Avg. retention score</span>
            <span className={`font-semibold ${avgScore >= 60 ? "text-amber-400" : "text-red-400"}`}>{avgScore} / 100</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {atRiskCustomers.map((c) => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left px-4 py-3.5 hover:bg-muted/40 transition-colors border-l-2 ${selected.id === c.id ? "bg-muted/50 border-l-primary" : "border-l-transparent"}`}>
              <div className="flex items-center gap-3">
                <div className={`size-8 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-foreground truncate">{c.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{c.complaints} complaint{c.complaints !== 1 ? "s" : ""} · {c.lastInteraction}</p>
                </div>
                <ScoreRing score={c.score} size={30} />
              </div>
              <div className="mt-2 ml-11"><RiskBadge risk={c.risk} /></div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-4 px-6 py-4 border-b border-border">
          <div className={`size-11 rounded-full bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-[14px] font-bold text-white shrink-0`}>{selected.initials}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[15px] font-semibold text-foreground">{selected.name}</h2>
              <RiskBadge risk={selected.risk} />
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{selected.email} · {selected.plan} · ${selected.mrr}/mo</p>
          </div>
          <ScoreRing score={selected.score} size={52} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5 flex items-start gap-5">
              <ScoreRing score={selected.score} size={80} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Retention Score</p>
                <p className="text-[22px] font-mono font-bold text-foreground leading-none">
                  {selected.score}<span className="text-[13px] text-muted-foreground font-normal"> / 100</span>
                </p>
                <div className="mt-1.5"><RiskBadge risk={selected.risk} /></div>
                <p className="text-[10px] font-mono text-muted-foreground mt-2">Last updated: today</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Risk Factors</p>
              {selected.riskFactors.length > 0 ? (
                <ul className="space-y-2">
                  {selected.riskFactors.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] font-mono text-foreground">
                      <span className="text-red-400 shrink-0 mt-0.5">▸</span>{f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] font-mono text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="size-3.5" />No active risk factors detected.</p>
              )}
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Lightbulb className="size-3 text-amber-400" />Recommended Action
              </p>
              <ul className="space-y-2">
                {selected.actions.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-[12px] font-mono text-indigo-300">
                    <CheckCircle2 className="size-3.5 text-indigo-400 shrink-0" />{a}
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors">
                <Zap className="size-3.5" />Execute Retention Flow
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <RefreshCw className="size-3 text-indigo-400" />Service Recovery Flow
              </p>
              <div className="relative flex flex-col">
                {recoveryFlow.map((step, i) => {
                  const Icon = step.icon;
                  const stepStatus = i < 2 ? "done" : i === 2 && selected.score < 50 ? "active" : selected.score >= 50 ? "done" : "pending";
                  const isDone = stepStatus === "done";
                  const isActive = stepStatus === "active";
                  return (
                    <div key={step.label} className="flex gap-3 relative">
                      {i < recoveryFlow.length - 1 && (
                        <div className="absolute left-[13px] top-7 bottom-0 w-px" style={{ background: isDone ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)" }} />
                      )}
                      <div className={`size-7 rounded-full flex items-center justify-center shrink-0 z-10 ${isDone ? "bg-indigo-500/20 border border-indigo-500/40" : isActive ? "bg-amber-500/20 border border-amber-500/50" : "bg-muted border border-border"}`}>
                        <Icon className="size-3.5" style={{ color: isDone ? "#6366f1" : isActive ? "#f59e0b" : "#475569" }} />
                      </div>
                      <div className="pb-4 flex-1">
                        <p className={`text-[12px] font-semibold font-mono leading-none ${stepStatus === "pending" ? "text-muted-foreground" : "text-foreground"}`}>{step.label}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{step.desc}</p>
                        {isDone && <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wide flex items-center gap-1 mt-1"><CheckCircle2 className="size-2.5" />Complete</span>}
                        {isActive && <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wide flex items-center gap-1 mt-1"><Clock className="size-2.5" />Active</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "customers", Component: CustomerProfilePage },
      { path: "complaints", Component: ComplaintsPage },
      { path: "at-risk", Component: RetentionIntelligencePage },
    ],
  },
]);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
