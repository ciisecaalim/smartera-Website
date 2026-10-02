export function PageLoadingSkeleton() {
  return (
    <main
      className="min-h-[70vh] bg-white"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Hero / heading */}
          <section className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="h-4 w-28 rounded-full bg-slate-200" />

              <div className="mt-5 h-10 w-11/12 rounded-xl bg-slate-200" />
              <div className="mt-3 h-10 w-8/12 rounded-xl bg-slate-200" />

              <div className="mt-6 h-4 w-full rounded bg-slate-200" />
              <div className="mt-3 h-4 w-10/12 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-7/12 rounded bg-slate-200" />

              <div className="mt-7 flex gap-3">
                <div className="h-11 w-36 rounded-lg bg-slate-200" />
                <div className="h-11 w-28 rounded-lg bg-slate-100" />
              </div>
            </div>

            <div className="h-[320px] rounded-3xl bg-slate-200 sm:h-[380px]" />
          </section>

          {/* Section heading */}
          <section className="mt-16">
            <div className="h-7 w-52 rounded-lg bg-slate-200" />
            <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />

            {/* Cards */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
                >
                  <div className="h-44 bg-slate-200" />

                  <div className="p-4">
                    <div className="h-4 w-20 rounded bg-slate-200" />
                    <div className="mt-4 h-5 w-10/12 rounded bg-slate-200" />
                    <div className="mt-3 h-4 w-full rounded bg-slate-100" />
                    <div className="mt-2 h-4 w-8/12 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lower content */}
          <section className="mt-16 grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 p-5"
              >
                <div className="h-12 w-12 rounded-full bg-slate-200" />
                <div className="mt-5 h-5 w-7/12 rounded bg-slate-200" />
                <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                <div className="mt-2 h-4 w-10/12 rounded bg-slate-100" />
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}