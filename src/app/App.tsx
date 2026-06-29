import { useState } from "react";
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
  ChevronDown,
  MoreHorizontal,
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
  {
    id: "#1287",
    title: "Internet not working",
    priority: "High",
    status: "Open",
    customer: "John D.",
    time: "2h ago",
    category: "Technical",
    agent: "Unassigned",
    notes: "Router reboot did not resolve. ISP ticket raised.",
  },
  {
    id: "#1286",
    title: "Billing Incorrect",
    priority: "Medium",
    status: "In Progress",
    customer: "Sarah K.",
    time: "4h ago",
    category: "Billing",
    agent: "Tom R.",
    notes: "Duplicate charge identified. Refund processing.",
  },
  {
    id: "#1285",
    title: "Poor Service",
    priority: "High",
    status: "Open",
    customer: "Michael T.",
    time: "6h ago",
    category: "Service",
    agent: "Unassigned",
    notes: "Customer escalated after three failed callbacks.",
  },
  {
    id: "#1284",
    title: "App Not Working",
    priority: "Low",
    status: "Resolved",
    customer: "Aisha M.",
    time: "8h ago",
    category: "Technical",
    agent: "Dev Team",
    notes: "Cache clear resolved the issue. Follow-up scheduled.",
  },
  {
    id: "#1283",
    title: "Slow connection speeds",
    priority: "Low",
    status: "Resolved",
    customer: "Priya S.",
    time: "1d ago",
    category: "Technical",
    agent: "Tom R.",
    notes: "Line test completed. Speed confirmed back to SLA.",
  },
  {
    id: "#1282",
    title: "Cancellation request",
    priority: "High",
    status: "In Progress",
    customer: "Marc B.",
    time: "1d ago",
    category: "Retention",
    agent: "Sarah Admin",
    notes: "Retention offer extended. Awaiting customer decision.",
  },
  {
    id: "#1281",
    title: "Login access denied",
    priority: "Medium",
    status: "Open",
    customer: "Lena W.",
    time: "2d ago",
    category: "Technical",
    agent: "Dev Team",
    notes: "Account locked after 5 failed attempts. Reset pending.",
  },
  {
    id: "#1280",
    title: "Service outage — no signal",
    priority: "High",
    status: "In Progress",
    customer: "Oscar F.",
    time: "2d ago",
    category: "Technical",
    agent: "Network Ops",
    notes: "Regional outage confirmed. ETA restoration: 4h.",
  },
  {
    id: "#1279",
    title: "Wrong plan charged",
    priority: "Medium",
    status: "Resolved",
    customer: "Fatima A.",
    time: "3d ago",
    category: "Billing",
    agent: "Tom R.",
    notes: "Plan corrected and prorated refund issued.",
  },
  {
    id: "#1278",
    title: "Equipment not delivered",
    priority: "High",
    status: "Open",
    customer: "Daniel O.",
    time: "3d ago",
    category: "Logistics",
    agent: "Unassigned",
    notes: "Tracking shows stuck at depot for 5 days.",
  },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Customers" },
  { icon: MessageSquareWarning, label: "Complaints", badge: 6 },
  { icon: AlertTriangle, label: "At-Risk" },
  { icon: Zap, label: "Automation" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const customerTabs = ["Overview", "Complaints", "Timeline", "Notes"];

const riskFactors = [
  "3 unresolved complaints in 60 days",
  "Negative sentiment in last 2 contacts",
  "Payment delayed — overdue by 12 days",
  "Usage dropped 40% vs prior quarter",
  "No response to retention offer (May)",
];

const recoverySteps = [
  {
    icon: AlertCircle,
    label: "Issue Detection",
    desc: "Complaint received & logged",
    status: "done",
    color: "#ef4444",
  },
  {
    icon: Zap,
    label: "Automated Response",
    desc: "Apology sent · Case created",
    status: "done",
    color: "#6366f1",
  },
  {
    icon: CheckCircle2,
    label: "Resolution",
    desc: "Issue resolved by support",
    status: "active",
    color: "#f59e0b",
  },
  {
    icon: Circle,
    label: "Follow Up",
    desc: "Customer satisfaction check",
    status: "pending",
    color: "#64748b",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: "bg-red-500/15 text-red-400 border border-red-500/20",
    Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    Low: "bg-slate-500/15 text-slate-400 border border-slate-500/25",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide ${map[priority] ?? ""}`}
    >
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
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${map[status] ?? ""}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

function KpiCard({
  label,
  value,
  sub,
  trend,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "flat";
  accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
      <div className="flex items-end gap-2">
        <span
          className="font-mono text-2xl font-semibold leading-none"
          style={{ color: accent ?? "#e8eaf0" }}
        >
          {value}
        </span>
        {trend === "up" && (
          <TrendingUp className="size-4 text-emerald-400 mb-0.5" />
        )}
        {trend === "down" && (
          <TrendingDown className="size-4 text-red-400 mb-0.5" />
        )}
        {trend === "flat" && <Minus className="size-4 text-slate-500 mb-0.5" />}
      </div>
      {sub && (
        <span className="text-[11px] text-muted-foreground font-mono">{sub}</span>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg p-3 text-xs font-mono shadow-xl">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
          {p.dataKey === "rate" ? "%" : ""}
        </p>
      ))}
    </div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");

  const filteredComplaints = complaints.filter((c) => {
    const matchStatus =
      statusFilter === "All Status" || c.status === statusFilter;
    const matchPriority =
      priorityFilter === "All Priority" || c.priority === priorityFilter;
    return matchStatus && matchPriority;
  });

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="w-[200px] shrink-0 flex flex-col border-r border-border h-full"
        style={{ background: "var(--sidebar)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <div className="size-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <Shield className="size-4 text-white" />
          </div>
          <span className="font-semibold text-sm text-foreground tracking-tight">
            sanisa
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, badge }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors group ${
                  isActive
                    ? "bg-sidebar-accent text-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-sidebar-foreground group-hover:text-foreground"}`}
                />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="text-[10px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors">
            <div className="size-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              SA
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate">
                Sarah Admin
              </p>
              <p className="text-[10px] text-muted-foreground truncate font-mono">
                CX Manager
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-border">
          <div>
            <h1 className="text-[15px] font-semibold text-foreground leading-none">
              {activeNav === "Complaints" ? "Complaints & Issues" : "CX Overview"}
            </h1>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
              {activeNav === "Complaints"
                ? `${filteredComplaints.length} cases · ${complaints.filter((c) => c.status === "Open").length} open`
                : "Retention Intelligence Platform"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 border border-border">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                placeholder={activeNav === "Complaints" ? "Search complaints..." : "Search customers..."}
                className="bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none w-40 font-mono"
              />
            </div>
            <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
              <Bell className="size-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
        {activeNav === "Complaints" ? (
          <ComplaintsPage
            complaints={complaints}
            filteredComplaints={filteredComplaints}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        ) : (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* ── KPI Row ── */}
          <div className="grid grid-cols-4 gap-3">
            <KpiCard
              label="At-Risk Customers"
              value="12,540"
              sub="↑ 340 from last month"
              trend="down"
              accent="#ef4444"
            />
            <KpiCard
              label="Retention Rate"
              value="82%"
              sub="↑ 2.1% vs prior period"
              trend="up"
              accent="#10b981"
            />
            <KpiCard
              label="Cases Open"
              value="1,204"
              sub="94 escalated · critical"
              trend="down"
              accent="#f59e0b"
            />
            <KpiCard
              label="Recovered"
              value="324"
              sub="This month · +18% MoM"
              trend="up"
              accent="#6366f1"
            />
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-5 gap-3">
            {/* Churn Risk Distribution */}
            <div className="col-span-2 bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                  Churn Risk Distribution
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <PieChart width={140} height={140}>
                    <Pie
                      data={churnData}
                      cx={65}
                      cy={65}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {churnData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-mono text-xl font-bold text-foreground leading-none">
                      1,904
                    </span>
                    <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
                      at-risk
                    </span>
                  </div>
                </div>
                <div className="space-y-2.5 flex-1">
                  {churnData.map((d) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full shrink-0"
                        style={{ background: d.color }}
                      />
                      <span className="text-[11px] text-muted-foreground flex-1 font-mono">
                        {d.name}
                      </span>
                      <span
                        className="text-[11px] font-mono font-semibold"
                        style={{ color: d.color }}
                      >
                        {d.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Retention Trend */}
            <div className="col-span-3 bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                  Retention Trend
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-4 h-0.5 bg-indigo-400 rounded" />
                    Rate %
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-4 h-0.5 bg-emerald-400 rounded" />
                    Recovered
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={110}>
                <LineChart
                  data={retentionTrendData}
                  margin={{ top: 0, right: 4, bottom: 0, left: -20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#64748b", fontFamily: "JetBrains Mono" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#64748b", fontFamily: "JetBrains Mono" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name="Retention Rate"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: "#6366f1" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    name="Recovered"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Bottom Row ── */}
          <div className="grid grid-cols-12 gap-3">
            {/* Complaints & Issues */}
            <div className="col-span-4 bg-card border border-border rounded-lg flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                  Complaints & Issues
                </h3>
                <button className="text-primary text-[11px] font-mono hover:underline flex items-center gap-0.5">
                  View all <ArrowUpRight className="size-3" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-[10px] font-mono bg-muted border border-border rounded px-2 py-1 text-foreground outline-none cursor-pointer"
                >
                  {["All Status", "Open", "In Progress", "Resolved"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="text-[10px] font-mono bg-muted border border-border rounded px-2 py-1 text-foreground outline-none cursor-pointer"
                >
                  {["All Priority", "High", "Medium", "Low"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto divide-y divide-border">
                {filteredComplaints.map((c) => (
                  <div
                    key={c.id}
                    className="px-4 py-3 hover:bg-muted/40 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                          {c.id}
                        </span>
                        <span className="text-[12px] font-medium text-foreground truncate">
                          {c.title}
                        </span>
                      </div>
                      <ChevronRight className="size-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <PriorityBadge priority={c.priority} />
                      <StatusBadge status={c.status} />
                      <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1.5">
                      {c.customer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Profile + Retention Intelligence */}
            <div className="col-span-5 flex flex-col gap-3">
              {/* Customer Profile */}
              <div className="bg-card border border-border rounded-lg">
                {/* Profile Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
                  <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                    Customer Profile
                  </h3>
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <MoreHorizontal className="size-3.5 text-muted-foreground" />
                  </button>
                </div>

                {/* Identity */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-foreground">
                        John Doe
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-500/15 text-red-400 border border-red-500/25">
                        <Flame className="size-2.5" /> High Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Mail className="size-2.5" /> john.doe@email.com
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                        <Phone className="size-2.5" /> +44 7700 900123
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center border-b border-border px-4">
                  {customerTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[11px] font-medium py-2.5 px-3 border-b-2 transition-colors font-mono ${
                        activeTab === tab
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="px-4 py-3">
                  {activeTab === "Overview" && (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {[
                        { label: "Customer Since", value: "Jan 2023" },
                        { label: "Total Complaints", value: "2" },
                        { label: "Retention Score", value: "32 / 100" },
                        { label: "Last Interaction", value: "2 days ago" },
                        { label: "Plan", value: "Business Pro" },
                        { label: "MRR", value: "$299 / mo" },
                      ].map((row) => (
                        <div key={row.label} className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">
                            {row.label}
                          </span>
                          <span className="text-[12px] font-medium text-foreground font-mono">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "Complaints" && (
                    <div className="space-y-2">
                      {complaints.slice(0, 3).map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center gap-2 text-[11px] font-mono"
                        >
                          <span className="text-muted-foreground">{c.id}</span>
                          <span className="text-foreground flex-1 truncate">
                            {c.title}
                          </span>
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
                          <span className="text-[10px] font-mono text-muted-foreground w-12 shrink-0">
                            {e.date}
                          </span>
                          <span className="text-[11px] font-mono text-foreground">
                            {e.event}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "Notes" && (
                    <p className="text-[11px] font-mono text-muted-foreground italic">
                      Customer frustrated with repeated billing errors. Escalate
                      to senior CX rep.
                    </p>
                  )}
                </div>
              </div>

              {/* Retention Intelligence */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                    Retention Intelligence
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    AI-powered
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  {/* Score */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="relative size-16">
                      <svg viewBox="0 0 64 64" className="size-full -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="rgba(255,255,255,0.07)"
                          strokeWidth="6"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="6"
                          strokeDasharray={`${(32 / 100) * 163.4} 163.4`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-base font-bold text-foreground leading-none">
                          32
                        </span>
                        <span className="text-[8px] font-mono text-muted-foreground">
                          /100
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-red-400 font-semibold uppercase tracking-wide">
                      High Risk
                    </span>
                  </div>

                  {/* Risk Factors */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-2">
                      Risk Factors
                    </p>
                    <ul className="space-y-1.5">
                      {riskFactors.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-1.5 text-[11px] font-mono text-foreground"
                        >
                          <span className="text-red-400 shrink-0 mt-0.5">
                            ▸
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-1.5">
                        Recommended Action
                      </p>
                      <ul className="space-y-1">
                        {[
                          "Offer apology + Service Fix",
                          "Provide 20% discount coupon",
                          "Follow up in 48 hours",
                        ].map((a) => (
                          <li
                            key={a}
                            className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-300"
                          >
                            <CheckCircle2 className="size-3 text-indigo-400 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Recovery Flow */}
            <div className="col-span-3 bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[12px] font-semibold text-foreground uppercase tracking-wider">
                  Service Recovery
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                  In Progress
                </span>
              </div>

              <div className="relative flex flex-col gap-0">
                {recoverySteps.map((step, i) => {
                  const Icon = step.icon;
                  const isDone = step.status === "done";
                  const isActive = step.status === "active";
                  const isPending = step.status === "pending";

                  return (
                    <div key={step.label} className="flex gap-3 relative">
                      {/* Connector line */}
                      {i < recoverySteps.length - 1 && (
                        <div
                          className="absolute left-[14px] top-7 bottom-0 w-px"
                          style={{
                            background: isDone
                              ? "rgba(99,102,241,0.4)"
                              : "rgba(255,255,255,0.07)",
                          }}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`size-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          isDone
                            ? "bg-indigo-500/20 border border-indigo-500/40"
                            : isActive
                              ? "bg-amber-500/20 border border-amber-500/50"
                              : "bg-muted border border-border"
                        }`}
                        style={{
                          boxShadow: isActive
                            ? "0 0 12px rgba(245,158,11,0.2)"
                            : undefined,
                        }}
                      >
                        <Icon
                          className="size-3.5"
                          style={{
                            color: isDone
                              ? "#6366f1"
                              : isActive
                                ? "#f59e0b"
                                : "#475569",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="pb-5 flex-1 min-w-0">
                        <p
                          className={`text-[12px] font-semibold font-mono leading-none ${
                            isPending ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-1">
                          {step.desc}
                        </p>
                        {isDone && (
                          <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-mono text-emerald-400 uppercase tracking-wide">
                            <CheckCircle2 className="size-2.5" /> Complete
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-wide">
                            <Clock className="size-2.5" /> Active
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action button */}
              <div className="mt-2 pt-3 border-t border-border">
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors">
                  <Zap className="size-3.5" />
                  Trigger Resolution Flow
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </main>
    </div>
  );
}

// ─── Complaints Page ──────────────────────────────────────────────────────────

type Complaint = {
  id: string;
  title: string;
  priority: string;
  status: string;
  customer: string;
  time: string;
  category: string;
  agent: string;
  notes: string;
};

function ComplaintsPage({
  complaints,
  filteredComplaints,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}: {
  complaints: Complaint[];
  filteredComplaints: Complaint[];
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
}) {
  const [selected, setSelected] = useState<Complaint | null>(null);

  const openCount = complaints.filter((c) => c.status === "Open").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ── List Panel ── */}
      <div className="flex flex-col flex-1 overflow-hidden border-r border-border">
        {/* Summary strip */}
        <div className="shrink-0 flex items-center gap-6 px-6 py-3 border-b border-border bg-muted/30">
          {[
            { label: "Open", count: openCount, color: "text-blue-400" },
            { label: "In Progress", count: inProgressCount, color: "text-indigo-400" },
            { label: "Resolved", count: resolvedCount, color: "text-emerald-400" },
            { label: "Total", count: complaints.length, color: "text-foreground" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className={`font-mono text-lg font-semibold leading-none ${s.color}`}>
                {s.count}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="shrink-0 flex items-center gap-2 px-6 py-3 border-b border-border">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[11px] font-mono bg-muted border border-border rounded-md px-3 py-1.5 text-foreground outline-none cursor-pointer hover:border-primary/40 transition-colors"
          >
            {["All Status", "Open", "In Progress", "Resolved"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-[11px] font-mono bg-muted border border-border rounded-md px-3 py-1.5 text-foreground outline-none cursor-pointer hover:border-primary/40 transition-colors"
          >
            {["All Priority", "High", "Medium", "Low"].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">
            {filteredComplaints.length} result{filteredComplaints.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {filteredComplaints.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground font-mono text-[12px]">
              No complaints match the current filters.
            </div>
          )}
          {filteredComplaints.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected?.id === c.id ? null : c)}
              className={`w-full text-left px-6 py-4 hover:bg-muted/40 transition-colors group ${
                selected?.id === c.id ? "bg-muted/60 border-l-2 border-l-primary" : "border-l-2 border-l-transparent"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* ID */}
                <span className="text-[11px] font-mono text-muted-foreground w-12 shrink-0 pt-0.5">
                  {c.id}
                </span>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground leading-snug">
                    {c.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <PriorityBadge priority={c.priority} />
                    <span className="text-muted-foreground text-[10px] font-mono">•</span>
                    <StatusBadge status={c.status} />
                    <span className="text-muted-foreground text-[10px] font-mono">•</span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1.5">
                    Customer: {c.customer}
                  </p>
                </div>

                {/* Time + chevron */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {c.time}
                  </span>
                  <ChevronRight
                    className={`size-4 transition-colors ${
                      selected?.id === c.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div className="w-[340px] shrink-0 flex flex-col overflow-hidden">
        {selected ? (
          <>
            <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-border">
              <span className="text-[11px] font-mono text-muted-foreground">
                Case {selected.id}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Close ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Title + badges */}
              <div>
                <h2 className="text-[15px] font-semibold text-foreground leading-snug">
                  {selected.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <PriorityBadge priority={selected.priority} />
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { label: "Customer", value: selected.customer },
                  { label: "Category", value: selected.category },
                  { label: "Assigned To", value: selected.agent },
                  { label: "Logged", value: selected.time },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">
                      {row.label}
                    </p>
                    <p className="text-[12px] font-mono text-foreground font-medium">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div>
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                  Case Notes
                </p>
                <p className="text-[12px] font-mono text-foreground leading-relaxed bg-muted/50 rounded-md px-3 py-2.5 border border-border">
                  {selected.notes}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                  Actions
                </p>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-colors">
                  <Zap className="size-3.5" />
                  Assign &amp; Escalate
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-[11px] font-semibold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="size-3.5" />
                  Mark Resolved
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center">
              <MessageSquareWarning className="size-5 text-muted-foreground" />
            </div>
            <p className="text-[12px] font-mono text-muted-foreground leading-relaxed">
              Select a complaint to view details and take action.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
