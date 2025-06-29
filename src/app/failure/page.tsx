"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function FailurePage() {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/langganan");
    }, 30000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleRetry = async () => {
    setRetrying(true);
    setTimeout(() => {
      router.push("/langganan");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-16">
      <div className="max-w-2xl mx-auto px-8">
        <Card className="text-center shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <XCircle size={48} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-4">
              Pembayaran Gagal
            </CardTitle>
            <p className="text-xl text-red-100">
              Ups! Ada masalah dengan pembayaran Anda
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Saran untuk Anda
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Pastikan saldo atau limit kartu mencukupi
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Periksa koneksi internet Anda</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Coba gunakan metode pembayaran lain
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    Hubungi customer service jika masalah berlanjut
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleRetry}
                disabled={retrying}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 text-lg font-semibold"
              >
                {retrying ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5 mr-2" />
                )}
                {retrying ? "Mencoba ulang..." : "Coba Lagi"}
              </Button>
              <Button
                onClick={() => router.push("/langganan")}
                variant="outline"
                className="flex-1 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Pilih Paket Lain
              </Button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
              <p className="text-yellow-800 text-sm">
                <strong>Butuh bantuan?</strong> Hubungi customer service kami.
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Halaman ini akan otomatis redirect ke pilihan paket dalam 30 detik
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
