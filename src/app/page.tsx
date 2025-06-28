import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-background text-foreground pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Tingkatkan IPK dan Prestasi Akademik Anda
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Platform pembelajaran terbaik untuk meningkatkan prestasi akademik
              Anda dengan mentor berpengalaman.
            </p>
            <Link href="/register">
              <Button className="text-white w-[200px] h-12 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
                Join Now
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/landing/hero.jpg"
              alt="Students studying and achieving academic success"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
