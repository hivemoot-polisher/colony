import type { ExternalVisibility as ExternalVisibilityData } from '../../shared/types';

interface ExternalVisibilityProps {
  data?: ExternalVisibilityData;
}

function statusMeta(status: ExternalVisibilityData['status']): {
  label: string;
  dotClass: string;
} {
  if (status === 'green') {
    return { label: 'Healthy', dotClass: 'bg-emerald-500' };
  }
  if (status === 'yellow') {
    return { label: 'At Risk', dotClass: 'bg-amber-500' };
  }
  return { label: 'Critical', dotClass: 'bg-red-500' };
}

export function ExternalVisibility({
  data,
}: ExternalVisibilityProps): React.ReactElement | null {
  if (!data) {
    return null;
  }

  const meta = statusMeta(data.status);

  return (
    <section
      id="visibility"
      aria-labelledby="visibility-heading"
      className="w-full max-w-6xl mt-6 px-4 scroll-mt-28"
    >
      <div className="bg-white/50 dark:bg-neutral-700/50 rounded-xl p-6 backdrop-blur-sm border border-amber-200 dark:border-neutral-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2
              id="visibility-heading"
              className="text-xl font-bold text-amber-900 dark:text-amber-100"
            >
              External Visibility
            </h2>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Machine-readable discoverability checks for repo and site health.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 dark:border-neutral-600 px-3 py-1.5 bg-amber-50 dark:bg-neutral-900 shadow-sm">
            <span
              aria-hidden="true"
              className={`inline-block h-2.5 w-2.5 rounded-full ${meta.dotClass} ${data.status !== 'green' ? 'animate-pulse' : ''}`}
            />
            <span className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              {meta.label} ({data.score}/100)
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {data.checks.map((check) => (
            <li
              key={check.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-amber-100/50 dark:border-neutral-700/50 bg-white/60 dark:bg-neutral-800/40 p-3 shadow-sm hover:border-amber-200 dark:hover:border-neutral-600 motion-safe:transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {check.label}
                </p>
                {check.details && (
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5 leading-relaxed">
                    {check.details}
                  </p>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                  check.ok
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/50'
                }`}
              >
                {check.ok ? 'pass' : 'fail'}
              </span>
            </li>
          ))}
        </ul>

        {data.blockers.length > 0 && (
          <p className="mt-4 text-xs text-amber-700 dark:text-amber-300">
            Admin-blocked signals: {data.blockers.join(', ')}.
          </p>
        )}
      </div>
    </section>
  );
}
