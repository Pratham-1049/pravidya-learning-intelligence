import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownRight, ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, CircleHelp, Clock3, Command, FlaskConical, LayoutDashboard, Menu, MoreHorizontal, Search, Settings2, Sparkles, Target, TrendingUp, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardSnapshot } from "@/services/dashboard-service";

export const Route = createFileRoute("/")({
  loader: () => getDashboardSnapshot(),
  head: () => ({
    meta: [
      { title: "PRAVIDYA — Student dashboard" },
      { name: "description", content: "Your academic progress, study plan, and subject performance at a glance." },
      { property: "og:title", content: "PRAVIDYA — Student dashboard" },
      { property: "og:description", content: "Your academic progress, study plan, and subject performance at a glance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const dashboard = Route.useLoaderData();
  const [activeNav, setActiveNav] = useState("Overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "My subjects", icon: BookOpen },
    { label: "Study planner", icon: CalendarDays },
    { label: "Progress & insights", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col bg-ink text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[74px] items-center justify-between border-b border-ink-line px-6">
          <a href="#overview" className="flex items-center gap-3" aria-label="PRAVIDYA home">
            <span className="grid size-9 place-items-center rounded-lg bg-cyan text-ink"><Sparkles size={19} strokeWidth={2.5} /></span>
            <span className="font-display text-[19px] font-bold tracking-[0.06em]">PRAVIDYA</span>
          </a>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-ink-raised lg:hidden" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X /></Button>
        </div>
        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/50">Your workspace</p>
          <nav aria-label="Main navigation" className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => { setActiveNav(label); setMobileNavOpen(false); }} aria-current={activeNav === label ? "page" : undefined} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${activeNav === label ? "bg-ink-raised text-cyan" : "text-sidebar-foreground/75 hover:bg-ink-raised hover:text-sidebar-foreground"}`}>
                <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === "Progress & insights" && <span className="ml-auto size-1.5 rounded-full bg-coral" />}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-9 px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/50">Your subjects</p>
          <div className="space-y-1">
            {dashboard.subjects.map((subject) => <button key={subject.code} onClick={() => setActiveNav("My subjects")} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] text-sidebar-foreground/80 transition-colors hover:bg-ink-raised"><span className={`size-2 rounded-full bg-${subject.color}`} /><span className="flex-1">{subject.name}</span><span className="text-[10px] text-sidebar-foreground/45">{subject.code}</span></button>)}
          </div>
        </div>
        <div className="mt-auto px-4 pb-5">
          <div className="rounded-lg border border-ink-line bg-ink-raised p-4">
            <div className="mb-3 flex items-center gap-2 text-cyan"><Target size={16} /><span className="text-[11px] font-semibold tracking-wide">EXAM COUNTDOWN</span></div>
            <p className="font-display text-[25px] font-semibold">147 <span className="font-sans text-[12px] font-normal text-sidebar-foreground/60">days to go</span></p>
            <p className="mt-1 text-[11px] text-sidebar-foreground/50">{dashboard.examSession} · IGCSE</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink-line"><div className="h-full w-[72%] rounded-full bg-cyan" /></div>
          </div>
          <button onClick={() => setNotice("Help and settings are coming soon.")} className="mt-4 flex w-full items-center gap-3 rounded-md px-3 py-2 text-[12px] text-sidebar-foreground/55 hover:text-sidebar-foreground"><Settings2 size={16} /> Settings <CircleHelp className="ml-auto" size={16} /></button>
        </div>
      </aside>

      {mobileNavOpen && <button aria-label="Dismiss navigation" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-30 bg-ink/50 lg:hidden" />}

      <div className="min-h-screen lg:pl-[264px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border bg-paper/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu /></Button>
            <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex"><span>Workspace</span><span className="text-border">/</span><span className="font-medium text-foreground">{activeNav}</span></div>
            <span className="rounded border border-border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:hidden">Mock data</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded border border-coral/25 bg-coral/10 px-2.5 py-1.5 text-[10px] font-semibold text-coral sm:flex"><span className="size-1.5 rounded-full bg-coral" /> DEMO DATA</span>
            <Button variant="ghost" size="icon" aria-label="Search" className="text-muted-foreground"><Search /></Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative text-muted-foreground"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-coral ring-2 ring-paper" /></Button>
            <div className="ml-1 flex items-center gap-2 border-l border-border pl-3 sm:pl-4"><div className="grid size-8 place-items-center rounded-full bg-ink text-[11px] font-semibold text-cyan">AL</div><div className="hidden sm:block"><p className="text-[11px] font-semibold leading-tight">Amelia L.</p><p className="mt-0.5 text-[10px] text-muted-foreground">Year 11 · IGCSE</p></div><ChevronDown size={14} className="hidden text-muted-foreground sm:block" /></div>
          </div>
        </header>

        <main className="mx-auto max-w-[1420px] px-4 pb-12 pt-7 sm:px-7 sm:pt-9 lg:px-9">
          {notice && <div role="status" className="mb-4 flex items-center justify-between rounded border border-border bg-paper px-4 py-3 text-sm"><span>{notice}</span><Button size="icon" variant="ghost" className="size-7" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></Button></div>}
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4 animate-rise-in">
            <div><div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted-foreground"><span>Monday, 16 November 2026</span><span className="size-1 rounded-full bg-cyan" />Personal overview</div><h1 className="font-display text-[28px] font-semibold leading-tight sm:text-[34px]">Good morning, {dashboard.studentName}<span className="text-cyan">.</span></h1><p className="mt-2 text-[13px] text-muted-foreground">A clear view of where you are — and what to focus on next.</p></div>
            <Button onClick={() => setNotice("Your weekly study plan is ready to review.")} className="h-10 gap-2 rounded-md bg-primary px-4 text-[12px] font-semibold shadow-none transition-transform hover:-translate-y-0.5"><CalendarDays size={15} /> View study plan <ArrowRight size={15} /></Button>
          </div>

          <section aria-label="Academic performance summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
            <article className="animate-rise-in rounded-lg bg-ink p-5 text-sidebar-foreground [animation-delay:40ms] sm:p-6">
              <div className="flex items-start justify-between"><div><p className="text-[11px] font-medium text-sidebar-foreground/60">Overall progress</p><p className="mt-2 font-display text-[34px] font-semibold leading-none">{dashboard.overallProgress}<span className="ml-0.5 text-[18px] text-cyan">%</span></p></div><span className="grid size-9 place-items-center rounded-md bg-cyan/10 text-cyan"><TrendingUp size={17} /></span></div>
              <div className="mt-5 h-[5px] overflow-hidden rounded-full bg-ink-line"><div className="h-full rounded-full bg-cyan" style={{ width: `${dashboard.overallProgress}%` }} /></div><p className="mt-3 flex items-center gap-1 text-[10px] text-sidebar-foreground/55"><ArrowDownRight size={13} className="rotate-[-45deg] text-lime" /> 6% ahead of your weekly target</p>
            </article>
            <article className="animate-rise-in rounded-lg border border-border bg-paper p-5 [animation-delay:90ms] sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-medium text-muted-foreground">Study time this week</p><p className="mt-2 font-display text-[34px] font-semibold leading-none">{dashboard.weeklyStudyHours}<span className="ml-1 text-[15px] font-medium text-muted-foreground">hrs</span></p></div><span className="grid size-9 place-items-center rounded-md bg-coral/10 text-coral"><Clock3 size={17} /></span></div><div className="mt-5 flex h-[5px] gap-1 overflow-hidden rounded-full bg-secondary"><span className="w-[58%] rounded-full bg-coral" /><span className="w-[20%] rounded-full bg-coral/25" /></div><p className="mt-3 text-[10px] text-muted-foreground">12.5 of 16 weekly hours · <span className="font-medium text-foreground">3.5 hrs to go</span></p></article>
            <article className="animate-rise-in rounded-lg border border-border bg-paper p-5 [animation-delay:140ms] sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-medium text-muted-foreground">Study streak</p><p className="mt-2 font-display text-[34px] font-semibold leading-none">{dashboard.studyStreak}<span className="ml-1 text-[15px] font-medium text-muted-foreground">days</span></p></div><span className="grid size-9 place-items-center rounded-md bg-lime/15 text-lime"><Zap size={17} /></span></div><div className="mt-4 flex items-center gap-1.5">{Array.from({ length: 8 }, (_, index) => <span key={index} className={`grid size-5 place-items-center rounded-full ${index < 6 ? "bg-lime/20 text-lime" : "bg-secondary text-muted-foreground"}`}><Check size={11} strokeWidth={2.5} /></span>)}</div><p className="mt-3 text-[10px] text-muted-foreground">A little practice every day adds up.</p></article>
          </section>

          <div className="mt-9 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.9fr)] xl:gap-9">
            <section aria-labelledby="subjects-heading" className="min-w-0">
              <div className="mb-4 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your learning</p><h2 id="subjects-heading" className="font-display text-[20px] font-semibold">Subject overview</h2></div><Button variant="ghost" onClick={() => setActiveNav("My subjects")} className="h-8 gap-1 px-2 text-[11px] text-muted-foreground">All subjects <ArrowRight size={14} /></Button></div>
              <div className="overflow-hidden rounded-lg border border-border bg-paper">
                <div className="hidden grid-cols-[minmax(145px,1fr)_72px_minmax(120px,1fr)_40px] items-center gap-4 border-b border-border bg-secondary/45 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:grid"><span>Subject</span><span>Current</span><span>Syllabus</span><span /></div>
                {dashboard.subjects.map((subject, index) => <article key={subject.code} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-4 sm:grid-cols-[minmax(145px,1fr)_72px_minmax(120px,1fr)_40px] sm:gap-4 sm:px-5 ${index < dashboard.subjects.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="min-w-0"><div className="flex items-center gap-2"><span className={`size-2 shrink-0 rounded-full bg-${subject.color}`} /><p className="truncate text-[12px] font-semibold">{subject.name}</p></div><p className="mt-1 pl-4 text-[10px] text-muted-foreground">{subject.code} · Cambridge IGCSE</p><p className="mt-2 truncate pl-4 text-[10px] text-muted-foreground sm:hidden">Next: {subject.nextTopic}</p></div>
                  <span className={`rounded px-2 py-1 text-center text-[11px] font-bold ${subject.color === "cyan" ? "bg-cyan/15 text-cyan" : subject.color === "lime" ? "bg-lime/15 text-lime" : "bg-coral/15 text-coral"}`}>{subject.grade}</span>
                  <div className="hidden min-w-0 sm:block"><div className="mb-1.5 flex justify-between text-[9px]"><span className="truncate pr-2 text-muted-foreground">{subject.nextTopic}</span><span className="font-semibold">{subject.progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full bg-${subject.color}`} style={{ width: `${subject.progress}%` }} /></div></div>
                  <Button variant="ghost" size="icon" aria-label={`More ${subject.name} options`} onClick={() => setNotice(`${subject.name} details will be available soon.`)} className="size-8 text-muted-foreground"><MoreHorizontal size={17} /></Button>
                  <div className="col-span-2 -mt-1 flex items-center gap-2 sm:hidden"><div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full bg-${subject.color}`} style={{ width: `${subject.progress}%` }} /></div><span className="w-8 text-right text-[9px] text-muted-foreground">{subject.progress}%</span></div>
                </article>)}
                <button onClick={() => setNotice("Subject catalogue is coming soon.")} className="flex w-full items-center justify-center gap-2 border-t border-border bg-secondary/30 py-3 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-secondary/60"><span className="text-base leading-none">+</span> Add a subject</button>
              </div>

              <section aria-labelledby="activity-heading" className="mt-8">
                <div className="mb-4 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Keep the momentum</p><h2 id="activity-heading" className="font-display text-[20px] font-semibold">Recent learning</h2></div><Button variant="ghost" onClick={() => setNotice("Your full learning history is coming soon.")} className="h-8 gap-1 px-2 text-[11px] text-muted-foreground">View history <ArrowRight size={14} /></Button></div>
                <div className="divide-y divide-border rounded-lg border border-border bg-paper px-4 sm:px-5">{dashboard.activities.map(activity => <article key={activity.id} className="flex items-center gap-3 py-3.5"><span className={`grid size-9 shrink-0 place-items-center rounded-md ${activity.color === "cyan" ? "bg-cyan/15 text-cyan" : activity.color === "lime" ? "bg-lime/15 text-lime" : "bg-coral/15 text-coral"}`}>{activity.subject === "Chemistry" ? <FlaskConical size={16} /> : <BookOpen size={16} />}</span><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold">{activity.title}</p><p className="mt-1 truncate text-[10px] text-muted-foreground">{activity.detail} <span className="px-1">·</span> {activity.date}</p></div><div className="text-right"><p className="font-display text-[15px] font-semibold">{activity.score}</p><p className="mt-0.5 text-[9px] text-muted-foreground">{activity.subject}</p></div></article>)}</div>
              </section>
            </section>

            <aside className="min-w-0" aria-label="Study plan">
              <section aria-labelledby="tasks-heading" className="overflow-hidden rounded-lg border border-border bg-paper">
                <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Monday · Nov 16</p><h2 id="tasks-heading" className="font-display text-[18px] font-semibold">Today’s focus</h2></div><Button variant="ghost" size="icon" aria-label="More study plan options" onClick={() => setNotice("More study plan options are coming soon.")} className="text-muted-foreground"><MoreHorizontal /></Button></div>
                <div className="px-5"><div className="flex items-center gap-2 border-b border-border py-3 text-[10px] text-muted-foreground"><Clock3 size={13} /><span>3 sessions planned</span><span className="ml-auto font-medium text-foreground">90 min</span></div>
                  <div className="py-1">{dashboard.tasks.map((task, index) => { const complete = completedTasks.includes(task.id); return <article key={task.id} className="relative flex gap-3 py-4"><div className="flex w-[42px] shrink-0 flex-col items-center"><span className="text-[10px] font-semibold text-foreground">{task.time}</span><span className="mt-2 size-2 rounded-full bg-cyan ring-4 ring-cyan/10" />{index < dashboard.tasks.length - 1 && <span className="absolute bottom-0 left-[50px] top-[46px] w-px bg-border" />}</div><div className={`min-w-0 flex-1 rounded-md border border-border px-3 py-3 transition-opacity ${complete ? "opacity-50" : ""}`}><div className="mb-1.5 flex flex-wrap items-center gap-1.5"><span className="text-[9px] font-semibold text-muted-foreground">{task.subject}</span><span className={`rounded px-1.5 py-0.5 text-[8px] font-semibold ${task.priority === "Due soon" ? "bg-coral/10 text-coral" : task.priority === "Focused" ? "bg-cyan/10 text-cyan" : "bg-secondary text-muted-foreground"}`}>{task.priority}</span></div><p className={`text-[11px] font-semibold leading-snug ${complete ? "line-through" : ""}`}>{task.title}</p><div className="mt-2.5 flex items-center justify-between"><span className="text-[9px] text-muted-foreground">{task.duration}</span><button aria-label={complete ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`} onClick={() => setCompletedTasks(current => complete ? current.filter(id => id !== task.id) : [...current, task.id])} className={`grid size-5 place-items-center rounded border transition-colors ${complete ? "border-lime bg-lime text-ink" : "border-border text-transparent hover:border-lime hover:text-lime"}`}><Check size={12} strokeWidth={2.5} /></button></div></div></article>; })}</div>
                </div>
                <Button variant="ghost" onClick={() => setNotice("Your study planner is coming soon.")} className="h-11 w-full gap-2 rounded-none border-t border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground"><CalendarDays size={14} /> Open study planner <ArrowRight size={14} /></Button>
              </section>

              <section aria-label="Study tip" className="relative mt-4 overflow-hidden rounded-lg bg-ink p-5 text-sidebar-foreground"><span className="absolute -right-4 -top-6 select-none font-display text-[105px] font-bold leading-none text-cyan/[0.06]">P</span><div className="relative"><div className="flex items-center gap-2 text-cyan"><Sparkles size={15} /><p className="text-[10px] font-semibold uppercase tracking-[0.12em]">Your study tip</p></div><p className="mt-3 max-w-[270px] font-display text-[15px] font-medium leading-snug">Short, consistent reviews help make new knowledge stick.</p><p className="mt-2 text-[10px] leading-relaxed text-sidebar-foreground/55">Based on your study activity. Tip shown as an example, not AI-generated.</p><Button variant="ghost" onClick={() => setNotice("More study tips are coming soon.")} className="mt-3 h-8 gap-1 px-0 text-[10px] font-semibold text-cyan hover:bg-transparent">Explore study tips <ArrowRight size={13} /></Button></div></section>

              <section className="mt-4 flex items-center justify-between rounded-lg border border-border bg-paper px-4 py-3.5"><div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-md bg-secondary text-muted-foreground"><Command size={15} /></span><div><p className="text-[10px] font-semibold">Quick revision</p><p className="mt-0.5 text-[9px] text-muted-foreground">Pick up where you left off</p></div></div><Button variant="ghost" size="icon" aria-label="Start quick revision" onClick={() => setNotice("Quick revision is coming soon.")} className="size-8 text-muted-foreground"><ArrowRight size={15} /></Button></section>
            </aside>
          </div>
          <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[9px] text-muted-foreground/70"><span>PRAVIDYA · Your learning, in focus.</span><span>Prototype preview · All student information shown is fictional.</span></footer>
        </main>
      </div>
    </div>
  );
}
