
import { article as Larticle, div as Ldiv, h2 as Lh2, h3 as Lh3, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import Link from "@/i18n/link";

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
    <Lsection
      className="
        relative overflow-hidden
        bg-[#f7f9fc]
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8
      "
    >
      <Ldiv
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

      <Ldiv
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

      <Ldiv className="relative mx-auto max-w-7xl">
        <Ldiv
          className="
            flex flex-col gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <Ldiv className="max-w-3xl">
            <Lspan
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
            </Lspan>

            <Lh2
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
              <Lspan className="text-[#F59223]">
                real experience.
              </Lspan>
            </Lh2>

            <Lp
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
            </Lp>
          </Ldiv>

          <Ldiv className="flex flex-wrap gap-3">
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
              Read More...
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
          </Ldiv>
        </Ldiv>

        {trainers.length ? (
          <Ldiv
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
                <Larticle
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
                    <Ldiv
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
                        <Ldiv
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
                        </Ldiv>
                      )}

                      <Ldiv
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
                      </Ldiv>

                      <Ldiv
                        className="
                          absolute inset-x-0 bottom-0
                          h-20
                          bg-gradient-to-t
                          from-black/50
                          to-transparent
                        "
                      />
                    </Ldiv>

                    <Ldiv className="p-5">
                      <Lp
                        className="
                          text-[10px]
                          font-black uppercase
                          tracking-[0.15em]
                          text-[#F59223]
                        "
                      >
                        {trainer.specialization}
                      </Lp>

                      <Lh3
                        className="
                          mt-2 text-xl
                          font-black
                          text-[#071D3D]
                          transition
                          group-hover:text-[#1f5fae]
                        "
                      >
                        {trainer.fullName}
                      </Lh3>

                      <Lp
                        className="
                          mt-1
                          text-sm font-semibold
                          text-slate-500
                        "
                      >
                        {trainer.professionalTitle}
                      </Lp>

                      <Ldiv
                        className="
                          mt-4 flex
                          flex-wrap gap-2
                        "
                      >
                        {(trainer.trainingAreas || [])
                          .slice(0, 3)
                          .map((area) => (
                            <Lspan
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
                            </Lspan>
                          ))}
                      </Ldiv>

                      <Ldiv
                        className="
                          mt-5 flex
                          items-center
                          justify-between
                          border-t
                          border-slate-100
                          pt-4
                        "
                      >
                        <Lspan
                          className="
                            text-xs
                            font-semibold
                            text-slate-500
                          "
                        >
                          {trainer.yearsExperience}+
                          {" "}
                          years experience
                        </Lspan>

                        <Lspan
                          className="
                            text-xs
                            font-black
                            text-[#1f5fae]
                          "
                        >
                          Read More...
                        </Lspan>
                      </Ldiv>
                    </Ldiv>
                  </Link>
                </Larticle>
              );
            })}
          </Ldiv>
        ) : (
          <Ldiv
            className="
              mt-10
              rounded-2xl
              border border-slate-200
              bg-white
              p-8 text-center
              shadow-sm
            "
          >
            <Lp className="font-bold text-[#071D3D]">
              Trainer profiles are being prepared.
            </Lp>

            <Lp className="mt-2 text-sm text-slate-500">
              Explore the trainer network for the latest
              published profiles.
            </Lp>

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
              Read More...
            </Link>
          </Ldiv>
        )}

        <Ldiv
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
          <Ldiv>
            <Lp
              className="
                text-[10px]
                font-black uppercase
                tracking-[0.17em]
                text-[#F59223]
              "
            >
              Join Our Trainer Network
            </Lp>

            <Lh3
              className="
                mt-2 text-xl
                font-black
                sm:text-2xl
              "
            >
              Are you an experienced professional?
            </Lh3>

            <Lp
              className="
                mt-2 max-w-2xl
                text-sm leading-6
                text-blue-100/70
              "
            >
              Share your expertise through practical
              training, workshops and professional
              development with Smartera Hub.
            </Lp>
          </Ldiv>

          <Ldiv className="flex flex-wrap gap-3">
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
          </Ldiv>
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}
