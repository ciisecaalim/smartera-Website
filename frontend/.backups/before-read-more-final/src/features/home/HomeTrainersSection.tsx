import Link from "next/link";

import { getPublishedTrainers } from "@/features/trainers";

function resolveTrainerImage(value: string) {
  if (!value) {
    return "";
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000/api";

  const apiOrigin = apiBase.replace(
    /\/api\/?$/,
    "",
  );

  if (value.startsWith("/")) {
    return `${apiOrigin}${value}`;
  }

  return value;
}

export async function HomeTrainersSection() {
  const result =
    await getPublishedTrainers();

  const trainers =
    (result || []).slice(0, 3);

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f7f9fc]
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-24 top-10
          h-72 w-72
          rounded-full
          bg-[#1f5fae]/5
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-24 bottom-0
          h-64 w-64
          rounded-full
          bg-[#F59223]/5
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            flex flex-col gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-3xl">
            <span
              className="
                inline-flex
                rounded-full
                border border-blue-100
                bg-blue-50
                px-3 py-1.5
                text-[10px]
                font-black uppercase
                tracking-[0.18em]
                text-[#1f5fae]
              "
            >
              Professional Trainer Network
            </span>

            <h2
              className="
                mt-5
                text-3xl font-black
                tracking-tight
                text-[#071D3D]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Learn from professionals
              who bring{" "}
              <span className="text-[#F59223]">
                real experience.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-sm leading-7
                text-slate-600
                sm:text-base
              "
            >
              Discover experienced trainers
              with practical industry knowledge
              across technology, business,
              professional skills and workforce
              development.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/trainers"
              className="
                inline-flex h-11
                items-center justify-center
                rounded-xl
                border border-[#1f5fae]/20
                bg-white
                px-5
                text-xs font-black
                text-[#1f5fae]
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-[#1f5fae]
              "
            >
              See More
            </Link>

            <Link
              href="/trainers/apply"
              className="
                inline-flex h-11
                items-center justify-center
                rounded-xl
                bg-[#F59223]
                px-5
                text-xs font-black
                text-white
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:bg-[#df7e12]
              "
            >
              Apply as a Trainer 
            </Link>
          </div>
        </div>

        {trainers.length ? (
          <div
            className="
              mt-10 grid gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {trainers.map((trainer) => {
              const image =
                resolveTrainerImage(
                  trainer.profileImage,
                );

              return (
                <article
                  key={trainer.slug}
                  className="
                    group overflow-hidden
                    rounded-[22px]
                    border border-slate-200
                    bg-white
                    shadow-sm
                    transition duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <Link
                    href={`/trainers/${trainer.slug}`}
                    className="block"
                  >
                    <div
                      className="
                        relative
                        aspect-[16/11]
                        overflow-hidden
                        bg-slate-100
                      "
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={
                            trainer.imageAlt ||
                            trainer.fullName
                          }
                          className="
                            h-full w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-[1.03]
                          "
                        />
                      ) : (
                        <div
                          className="
                            grid h-full w-full
                            place-items-center
                            bg-[#071D3D]
                            text-4xl font-black
                            text-white
                          "
                        >
                          {trainer.fullName
                            .split(" ")
                            .slice(0, 2)
                            .map(
                              (part) =>
                                part[0],
                            )
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}

                      <div
                        className="
                          absolute left-4 top-4
                          rounded-full
                          border border-white/40
                          bg-[#071D3D]/85
                          px-3 py-1.5
                          text-[9px]
                          font-black uppercase
                          tracking-wider
                          text-white
                          backdrop-blur
                        "
                      >
                        Smartera Trainer
                      </div>

                      <div
                        className="
                          absolute inset-x-0 bottom-0
                          h-20
                          bg-gradient-to-t
                          from-black/50
                          to-transparent
                        "
                      />
                    </div>

                    <div className="p-5">
                      <p
                        className="
                          text-[10px]
                          font-black uppercase
                          tracking-[0.15em]
                          text-[#F59223]
                        "
                      >
                        {trainer.specialization}
                      </p>

                      <h3
                        className="
                          mt-2 text-xl
                          font-black
                          text-[#071D3D]
                          transition
                          group-hover:text-[#1f5fae]
                        "
                      >
                        {trainer.fullName}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm font-semibold
                          text-slate-500
                        "
                      >
                        {trainer.professionalTitle}
                      </p>

                      <div
                        className="
                          mt-4 flex
                          flex-wrap gap-2
                        "
                      >
                        {(trainer.trainingAreas || [])
                          .slice(0, 3)
                          .map((area) => (
                            <span
                              key={area}
                              className="
                                rounded-full
                                bg-slate-100
                                px-2.5 py-1
                                text-[10px]
                                font-bold
                                text-slate-600
                              "
                            >
                              {area}
                            </span>
                          ))}
                      </div>

                      <div
                        className="
                          mt-5 flex
                          items-center
                          justify-between
                          border-t
                          border-slate-100
                          pt-4
                        "
                      >
                        <span
                          className="
                            text-xs
                            font-semibold
                            text-slate-500
                          "
                        >
                          {trainer.yearsExperience}+
                          {" "}
                          years experience
                        </span>

                        <span
                          className="
                            text-xs
                            font-black
                            text-[#1f5fae]
                          "
                        >
                          See More
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className="
              mt-10
              rounded-2xl
              border border-slate-200
              bg-white
              p-8 text-center
              shadow-sm
            "
          >
            <p className="font-bold text-[#071D3D]">
              Trainer profiles are being prepared.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Explore the trainer network for the latest
              published profiles.
            </p>

            <Link
              href="/trainers"
              className="
                mt-5 inline-flex
                rounded-xl
                bg-[#1f5fae]
                px-5 py-2.5
                text-xs font-black
                text-white
              "
            >
              See More
            </Link>
          </div>
        )}

        <div
          className="
            mt-10
            flex flex-col gap-5
            rounded-[24px]
            bg-[#071D3D]
            px-6 py-7
            text-white
            shadow-xl
            sm:px-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black uppercase
                tracking-[0.17em]
                text-[#F59223]
              "
            >
              Join Our Trainer Network
            </p>

            <h3
              className="
                mt-2 text-xl
                font-black
                sm:text-2xl
              "
            >
              Are you an experienced professional?
            </h3>

            <p
              className="
                mt-2 max-w-2xl
                text-sm leading-6
                text-blue-100/70
              "
            >
              Share your expertise through practical
              training, workshops and professional
              development with Smartera Hub.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/trainers/apply"
              className="
                inline-flex h-11
                items-center justify-center
                rounded-xl
                bg-[#F59223]
                px-5
                text-xs font-black
                text-white
                transition
                hover:bg-[#df7e12]
              "
            >
              Apply as a Trainer 
            </Link>

            <Link
              href="/trainers/manage"
              className="
                inline-flex h-11
                items-center justify-center
                rounded-xl
                border border-white/30
                bg-white/10
                px-5
                text-xs font-black
                text-white
                transition
                hover:bg-white
                hover:text-[#071D3D]
              "
            >
              Manage My Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
