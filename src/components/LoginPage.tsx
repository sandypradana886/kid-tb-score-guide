
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Shield, Users, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);

    // Simulasi proses masuk
    setTimeout(() => {
      toast({
        title: "Selamat Datang!",
        description: "Anda berhasil masuk ke Sistem Penilaian TB Anak",
      });
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Penilaian Akurat",
      description: "Sistem skoring berdasarkan pedoman IDAI terbaru"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: "Data Aman",
      description: "Keamanan data pasien terjamin"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Untuk Profesional",
      description: "Dirancang khusus untuk tenaga kesehatan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start">
              <Stethoscope className="h-12 w-12 text-blue-600 mr-3" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">TB Anak</h1>
                <p className="text-lg text-blue-600 font-medium">Sistem Penilaian</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
              Platform profesional untuk penilaian risiko tuberkulosis pada anak berdasarkan pedoman WHO, CDC, dan IDAI
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 rounded-lg">
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Simple Login */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Masuk ke Sistem</CardTitle>
              <CardDescription className="text-gray-600">
                Klik tombol di bawah untuk mengakses sistem penilaian TB anak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Akses Mudah:</strong> Tidak perlu registrasi atau login yang rumit. 
                    Langsung gunakan semua fitur sistem penilaian TB anak.
                  </p>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5" />
                      <span>Masuk ke Sistem</span>
                    </div>
                  )}
                </Button>
              </div>

              <div className="text-center space-y-3">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Akses aman dan terpercaya</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Heart className="h-4 w-4" />
                  <span>Berdasarkan pedoman medis terkini</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Dengan menggunakan sistem ini, Anda menyetujui penggunaan sesuai dengan 
                  <br />
                  <span className="text-blue-600 hover:underline cursor-pointer">kebijakan penggunaan</span> yang berlaku
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
