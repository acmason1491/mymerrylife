import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            學員怎麼說
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            來自真實學員的回饋，幫助你更有信心開始學習
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-400">
                {t.name[0]}
              </div>
              <div className="mb-3 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-500">「{t.content}」</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
