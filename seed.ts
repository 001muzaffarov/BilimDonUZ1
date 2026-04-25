import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.lesson.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@bilimdon.uz",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create Courses
  const courses = [
    {
      title: "Zamonaviy Web Dasturlash (Next.js)",
      description: "Full-stack web dasturlarni noldan professional darajagacha qurishni o'rganing.",
      price: 1200000,
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      lessons: [
        { title: "Kirish va Environment sozlash", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
        { title: "React Asoslari", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 2 },
        { title: "Server Components va Actions", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 3 },
      ]
    },
    {
      title: "UI/UX Dizayn: Figma va Prototiplash",
      description: "Mobil va web ilovalar uchun premium dizaynlar yaratish sirlari.",
      price: 850000,
      imageUrl: "https://images.unsplash.com/photo-1561070791-26c11d6996ad?w=800",
      lessons: [
        { title: "Figma interfeysi va asosiy asboblar", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
        { title: "Ranglar nazariyasi va Tipografiya", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 2 },
      ]
    },
    {
      title: "Grafik Dizayn va Brending",
      description: "Logotip va brend identifikatsiyasini yaratish bo'yicha to'liq kurs.",
      price: 900000,
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
      lessons: [
        { title: "Illustrator asoslari", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
      ]
    },
    {
      title: "Python bilan Ma'lumotlar Tahlili",
      description: "Data Science dunyosiga ilk qadam. Pandas, Numpy va Matplotlib.",
      price: 1500000,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      lessons: [
        { title: "Python sintaksisi va tiplar", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
      ]
    },
    {
      title: "SMM va Digital Marketing",
      description: "Ijtimoiy tarmoqlarda biznesni rivojlantirish va reklama sozlash.",
      price: 700000,
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      lessons: [
        { title: "Targeting va Strategiya", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", order: 1 },
      ]
    }
  ];

  for (const c of courses) {
    await prisma.course.create({
      data: {
        title: c.title,
        description: c.description,
        price: c.price,
        imageUrl: c.imageUrl,
        lessons: {
          create: c.lessons
        }
      }
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
