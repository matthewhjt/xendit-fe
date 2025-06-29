"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      router.push("/profile");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="max-w-2xl mx-auto px-8">
        <Card className="text-center shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 bg-white/20 rounded-full flex items-center justify-center ${
                  showAnimation ? "animate-bounce" : ""
                }`}
              >
                <CheckCircle size={48} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-4">
              Pembayaran Berhasil!
            </CardTitle>
            <p className="text-xl text-green-100">
              Selamat! Langganan Anda telah aktif
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Apa yang bisa Anda lakukan sekarang?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">
                    Akses semua video pembelajaran premium
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">Download materi dan rangkuman</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">
                    Ikut kuis dan dapatkan sertifikat
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">Gabung komunitas eksklusif</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => router.push("/class")}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 text-lg font-semibold"
              >
                Mulai Belajar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => router.push("/profile")}
                variant="outline"
                className="flex-1 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400"
              >
                Lihat Profil
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Halaman ini akan otomatis redirect ke profil dalam 10 detik
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
