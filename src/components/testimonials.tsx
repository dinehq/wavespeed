import Image from "next/image";

const testimonials = [
  {
    logo: "/images/freepik-logo.svg",
    logoWidth: 87,
    quote:
      "Everyone wants faster, cheaper, and their way to use AI image and video generation services? Partnering with WaveSpeedAI has helped us stay competitive in AI media generation.",
    name: "Alejandro Palma",
    title: "Cloud Architect at Freepik",
  },
  {
    logo: "/images/novita-vector.svg",
    logoWidth: 88,
    quote:
      "WaveSpeedAI has significantly improved our inference efficiency and helped us cut video generation costs by up to 67%. With faster and more reliable video processing, we\u2019re able to deliver an exceptional user experience at scale.",
    name: "Junyu Huang",
    title: "Novita AI COO",
  },
  {
    logo: "/images/socialbook-logo.svg",
    logoWidth: 131,
    quote:
      "Wavespeed lives up to its name \u2014 the model is fast, and their team\u2019s response time is even faster. We recently switched from FAL to Wavespeed, and the difference is night and day.",
    name: "Chen",
    title: "CTO@SocialBook",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface px-20 py-20">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-[48px] font-medium leading-none tracking-[-1px] text-heading mb-6">
          What people are saying
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-md p-10 flex flex-col gap-4 relative overflow-hidden transition-all duration-200 group hover:shadow-[0px_12px_24px_0px_rgba(0,0,0,0.08)] cursor-pointer hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <Image
                  src="/images/feedback-bg.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-6" style={{ width: t.logoWidth }}>
                <Image src={t.logo} alt="" fill className="object-contain" />
              </div>
              <p className="relative text-lg leading-[1.5] text-black">{t.quote}</p>
              <div className="relative font-mono text-sm leading-[1.5] text-muted">
                <p>{t.name}</p>
                <p>{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
