"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { UserProfile, PaymentHistory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const profileResponse = await api.get("/auth/me");
        setProfile(profileResponse.data.user);

        const historyResponse = await api.get("/payments/history");
        setPaymentHistory(historyResponse.data.data);
      } catch (err: any) {
        setError("Failed to load profile data");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string) => {
    return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
  };

  const getStatusBadge = (payment: PaymentHistory) => {
    switch (payment.status) {
      case "PAID":
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="font-medium">Pembayaran Selesai</span>
          </div>
        );
      case "PENDING":
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle size={16} />
            <span className="font-medium">Menunggu Pembayaran</span>
          </div>
        );
      case "EXPIRED":
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle size={16} />
            <span className="font-medium">Pembayaran Kadaluarsa</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span className="font-medium">Status Tidak Diketahui</span>
          </div>
        );
    }
  };

  const handlePayment = (paymentUrl: string) => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
    }
  };

  const getSubscriptionInfo = (payment: PaymentHistory) => {
    if (payment.subscription) {
      return {
        startDate: payment.subscription.startDate,
        endDate: payment.subscription.endDate,
        status: payment.subscription.status,
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-8">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <User className="w-6 h-6" />
              Profil Saya
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <p className="text-lg text-gray-900">{profile?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <p className="text-lg text-gray-900">
                  {profile?.fullname || "Belum diisi"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Riwayat Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {paymentHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Belum ada riwayat pembayaran</p>
              </div>
            ) : (
              <div className="space-y-6">
                {paymentHistory.map((payment) => {
                  const subscriptionInfo = getSubscriptionInfo(payment);

                  return (
                    <div
                      key={payment.id}
                      className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-1 h-16 rounded-full ${
                                payment.status === "PAID"
                                  ? "bg-gradient-to-b from-green-500 to-emerald-600"
                                  : payment.status === "PENDING"
                                  ? "bg-gradient-to-b from-yellow-500 to-orange-600"
                                  : "bg-gradient-to-b from-red-500 to-rose-600"
                              }`}
                            ></div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {payment.subscriptionPlan.name}
                              </h3>
                              {subscriptionInfo ? (
                                <p className="text-gray-600">
                                  {formatDate(subscriptionInfo.startDate)}{" "}
                                  hingga {formatDate(subscriptionInfo.endDate)}
                                </p>
                              ) : (
                                <p className="text-gray-600">
                                  Dibuat: {formatDate(payment.createdAt)}
                                </p>
                              )}
                              <p className="text-gray-600">
                                ID Pembayaran: {payment.id}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(payment)}
                        </div>
                      </div>

                      {payment.status === "PENDING" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <p className="text-yellow-800 text-center">
                            Bayar sebelum {formatDateTime(payment.expiresAt)}{" "}
                            WIB
                          </p>
                        </div>
                      )}

                      {subscriptionInfo && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <p className="text-blue-800 text-center">
                            Status Langganan:{" "}
                            <strong>{subscriptionInfo.status}</strong>
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Pembayaran
                          </label>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(payment.amount)}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Metode Pembayaran
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {payment.paymentMethod || "Belum dipilih"}
                          </p>
                          {payment.paidAt && (
                            <p className="text-sm text-gray-600">
                              Dibayar: {formatDateTime(payment.paidAt)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-end justify-end">
                          {payment.status === "PENDING" &&
                            payment.paymentUrl && (
                              <Button
                                onClick={() =>
                                  handlePayment(payment.paymentUrl)
                                }
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2"
                              >
                                Bayar Sekarang
                              </Button>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
