"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { SubscriptionPackage } from "@/lib/types";
import PackageCard from "./PackageCard";
import PaymentMethodSelector from "./PaymentSelector";

export default function LanggananPage() {
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await api.get("/payments/packages");
        setPackages(response.data.data);
      } catch (err: any) {
        setError("Failed to load packages");
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setPaymentMethod(""); 
  };

  const handleBackToPackages = () => {
    setSelectedPackageId(null);
    setPaymentMethod("");
  };

  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPackageId && selectedPackage) {
    return (
      <PaymentMethodSelector
        selectedPackage={selectedPackage}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onBack={handleBackToPackages}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pilih Paket Langganan
          </h1>
          <p className="text-xl text-gray-600">
            Akses semua kelas dan fitur premium dengan harga terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onSelect={handleSelectPackage}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Yang Kamu Dapatkan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📹</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Video Premium
              </h3>
              <p className="text-gray-600 text-sm">
                Akses 500+ video belajar berkualitas tinggi
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bank Soal</h3>
              <p className="text-gray-600 text-sm">
                Latihan soal lengkap dengan pembahasan
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rangkuman</h3>
              <p className="text-gray-600 text-sm">
                Ringkasan materi mudah dipahami
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Komunitas</h3>
              <p className="text-gray-600 text-sm">
                Tanya jawab dengan mentor dan teman
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
