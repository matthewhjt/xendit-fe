"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SubscriptionPackage } from "@/lib/types";

interface PackageCardProps {
  package: SubscriptionPackage;
  onSelect: (packageId: string) => void;
}

export default function PackageCard({
  package: pkg,
  onSelect,
}: PackageCardProps) {
  const isPopular =
    pkg.name.includes("3") || pkg.name.toLowerCase().includes("populer");
  const durationInMonths = Math.round(pkg.durationDays / 30);

  const features = [
    "Akses semua video pembelajaran",
    "Bank soal dan pembahasan",
    "Rangkuman materi lengkap",
    "Akses komunitas belajar",
    "Sertifikat penyelesaian",
    "Support 24/7",
  ];

  const handleSubscribe = () => {
    if (pkg.isActive) {
      onSelect(pkg.id);
    }
  };

  return (
    <Card
      className={`relative transition-all duration-300 hover:shadow-xl ${
        isPopular
          ? "border-2 border-purple-500 shadow-lg scale-105"
          : "border border-gray-200 hover:border-blue-300"
      } bg-white ${!pkg.isActive ? "opacity-50" : ""}`}
    >
      {isPopular && pkg.isActive && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Star size={16} fill="white" />
            TERPOPULER
          </div>
        </div>
      )}

      {!pkg.isActive && (
        <div className="absolute top-4 right-4">
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Tidak Aktif
          </span>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-gray-900">
            Rp {pkg.price.toLocaleString("id-ID")}
          </div>
          <div className="text-gray-600">
            {durationInMonths} bulan ({pkg.durationDays} hari)
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-4">{pkg.description}</div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-center">
            Fitur Termasuk:
          </h4>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                  isPopular ? "bg-purple-500" : "bg-blue-500"
                }`}
              >
                <Check size={12} className="text-white" />
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubscribe}
          disabled={!pkg.isActive}
          className={`w-full py-3 text-lg font-semibold rounded-xl mt-6 transition-all duration-300 ${
            !pkg.isActive
              ? "bg-gray-400 cursor-not-allowed"
              : isPopular
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          }`}
        >
          {!pkg.isActive ? "Tidak Tersedia" : "Berlangganan Sekarang"}
        </Button>

        {durationInMonths >= 3 && pkg.isActive && (
          <div className="text-center">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
              Hemat Lebih Banyak!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
