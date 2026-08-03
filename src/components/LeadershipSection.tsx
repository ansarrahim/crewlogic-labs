import { Award, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { CEO } from "@/lib/data";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Human Leadership
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Architect Behind the Crew
          </h2>
          <p className="mt-4 text-slate-400">
            Every autonomous engineering decision is grounded in verified,
            human-led technical judgment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-lg font-bold text-emerald-400">
                MA
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  {CEO.name}
                </h3>
                <p className="text-sm text-cyan-400">{CEO.title}</p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-slate-400">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{CEO.education}</span>
            </div>

            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                Certifications
              </p>
              <ul className="space-y-2">
                {CEO.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <Award className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Core Specialties
              </p>
              <ul className="space-y-2">
                {CEO.specialties.map((spec) => (
                  <li
                    key={spec}
                    className="text-sm text-slate-300 before:mr-2 before:text-emerald-400 before:content-['▹']"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-3">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-100">
                The 70/30 Engineering Rule
              </h3>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-slate-400">
              CrewLogic Labs operates on a hybrid delivery model — autonomous
              AI agents execute the bulk of implementation work at machine
              speed, while human architectural rigor governs every critical
              decision before it ships.
            </p>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    Automated Code &amp; Test Execution
                  </span>
                  <span className="font-mono font-semibold text-emerald-400">
                    70%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                    style={{ width: "70%" }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Executed by the CrewLogic Labs AI agent workforce
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    Strategic Architecture, Security &amp; QA
                  </span>
                  <span className="font-mono font-semibold text-cyan-400">
                    30%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    style={{ width: "30%" }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                  Owned directly by {CEO.name}, human-in-the-loop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
