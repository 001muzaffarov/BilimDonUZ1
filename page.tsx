import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { ArrowRight, Sparkles, GraduationCap, ShieldCheck, Zap, BookOpen } from "lucide-react";
import { getCourses } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const featuredCourses = await getCourses();

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-ios-blue/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 ios-shadow animate-bounce">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-xs font-bold tracking-wider uppercase">Yangi Davr Ta'limi</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-foreground">
            Kelajak Bilimlarini <br />
            <span className="text-ios-blue">Bugun O'rganing</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-foreground/60 mb-12">
            O'zbekistondagi eng ilg'or ta'lim platformasi. Biz bilan yuqori daromadli kasblarni
            shaffof va sifatli muhitda o'rganing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/courses" className="bg-ios-blue text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:opacity-90 active:scale-95 smooth-transition flex items-center gap-2">
              Kurslarni ko'rish <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="glass text-foreground px-10 py-4 rounded-2xl font-bold text-lg hover:bg-ios-gray active:scale-95 smooth-transition inline-flex items-center justify-center">
              Biz haqimizda
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, label: "Talabalar", val: "10,000+" },
            { icon: Zap, label: "Kurslar", val: "50+" },
            { icon: ShieldCheck, label: "Sertifikatlar", val: "Hammasi" },
            { icon: Sparkles, label: "Reyting", val: "4.9/5" },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-3xl text-center ios-shadow">
              <div className="w-12 h-12 bg-ios-gray rounded-2xl flex items-center justify-center mx-auto mb-4 text-ios-blue">
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-black text-foreground">{stat.val}</div>
              <div className="text-xs text-foreground/40 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-6 bg-ios-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">Tavsiya etilgan kurslar</h2>
              <p className="text-foreground/60">O'zingizga ma'qul bo'lgan yo'nalishni tanlang</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-ios-blue font-bold hover:underline smooth-transition">
              Barcha kurslar <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ios-gray">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
             <div className="w-8 h-8 bg-ios-blue rounded-lg flex items-center justify-center text-white">
                <BookOpen size={18} />
              </div>
              <span className="text-lg font-bold">BilimDon</span>
          </div>
          <p className="text-sm text-foreground/40">
            © 2026 BilimDon MCHJ. Barcha huquqlar himoyalangan. <br />
            iOS 26 Style Design Concept.
          </p>
        </div>
      </footer>
    </main>
  );
}
