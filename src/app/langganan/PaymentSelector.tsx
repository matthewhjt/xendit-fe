"use client";

import { useState } from "react";
import api from "@/lib/api";
import { SubscriptionPackage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, QrCode, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentMethodSelectorProps {
  selectedPackage: SubscriptionPackage;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onBack: () => void;
}

export default function PaymentMethodSelector({
  selectedPackage,
  paymentMethod,
  setPaymentMethod,
  onBack,
}: PaymentMethodSelectorProps) {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const paymentMethods = {
    credit: {
      title: "Kartu Kredit",
      icon: <CreditCard className="w-6 h-6" />,
      methods: ["CREDIT_CARD"],
      color: "from-blue-500 to-indigo-600",
    },
    virtual: {
      title: "Virtual Account",
      icon: <Building2 className="w-6 h-6" />,
      methods: ["BCA", "BNI", "BRI", "MANDIRI", "PERMATA", "BSI", "CIMB"],
      color: "from-green-500 to-emerald-600",
    },
    qris: {
      title: "QRIS",
      icon: <QrCode className="w-6 h-6" />,
      methods: ["QRIS"],
      color: "from-purple-500 to-pink-600",
    },
  };

  const bankLogos = {
    BCA: "🏦",
    BNI: "🏛️",
    BRI: "🏦",
    MANDIRI: "🏛️",
    PERMATA: "🏦",
    BSI: "🏛️",
    CIMB: "🏦",
  };

  const handlePayment = async () => {
    if (!paymentMethod || !selectedPackage) return;

    setProcessing(true);
    try {
      const response = await api.post("/payments/subscribe", {
        packageId: selectedPackage.id,
        paymentMethod: paymentMethod,
      });

      if (response.status === 201) {
        router.push(response.data.data.paymentUrl);
      }
    } catch (error) {
      console.error("Payment creation failed:", error);
      alert("Gagal membuat pembayaran. Silakan coba lagi.");
    } finally {
      setProcessing(false);
    }
  };

  const durationInMonths = Math.round(selectedPackage.durationDays / 30);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Pilih Metode Pembayaran
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <CardHeader
                className={`bg-gradient-to-r ${paymentMethods.credit.color} text-white`}
              >
                <CardTitle className="flex items-center gap-3">
                  {paymentMethods.credit.icon}
                  {paymentMethods.credit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {paymentMethods.credit.methods.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Kartu Kredit
                          </p>
                          <p className="text-sm text-gray-600">
                            Visa, Mastercard, JCB
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader
                className={`bg-gradient-to-r ${paymentMethods.virtual.color} text-white`}
              >
                <CardTitle className="flex items-center gap-3">
                  {paymentMethods.virtual.icon}
                  {paymentMethods.virtual.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.virtual.methods.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {bankLogos[method as keyof typeof bankLogos]}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {method}
                          </p>
                          <p className="text-sm text-gray-600">
                            Virtual Account
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader
                className={`bg-gradient-to-r ${paymentMethods.qris.color} text-white`}
              >
                <CardTitle className="flex items-center gap-3">
                  {paymentMethods.qris.icon}
                  {paymentMethods.qris.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {paymentMethods.qris.methods.map((method) => (
                    <label
                      key={method}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <QrCode className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="font-semibold text-gray-900">QRIS</p>
                          <p className="text-sm text-gray-600">
                            Scan QR dengan e-wallet
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPackage.description}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Durasi</span>
                    <span className="font-medium">
                      {durationInMonths} bulan
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Harga</span>
                    <span className="text-2xl font-bold text-gray-900">
                      Rp {selectedPackage.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!paymentMethod || processing}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                >
                  {processing ? "Memproses..." : "Bayar Sekarang"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
