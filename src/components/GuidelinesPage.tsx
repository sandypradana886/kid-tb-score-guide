
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Globe, FileText } from "lucide-react";

const GuidelinesPage = ({ onBack }) => {
  const guidelines = [
    {
      organization: "WHO (World Health Organization)",
      title: "Pedoman WHO untuk TB Anak",
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      content: [
        "Diagnosis TB anak berdasarkan kombinasi gejala klinis, pemeriksaan fisik, dan pemeriksaan penunjang",
        "Anak dengan kontak TB dewasa memiliki risiko tinggi untuk tertular",
        "Gejala TB anak: demam berkepanjangan, batuk kronik, penurunan berat badan",
        "Foto thoraks dapat menunjukkan gambaran TB pada 50-80% kasus TB anak",
        "Uji tuberkulin (TST) positif jika indurasi ≥10mm pada anak tanpa imunokompromais"
      ]
    },
    {
      organization: "CDC (Centers for Disease Control)",
      title: "Pedoman CDC untuk TB Anak",
      icon: <FileText className="h-6 w-6 text-green-600" />,
      content: [
        "Skrining rutin untuk anak berisiko tinggi dengan riwayat kontak TB",
        "Penggunaan Interferon Gamma Release Assays (IGRA) sebagai alternatif TST",
        "Pemberian pengobatan preventif untuk anak dengan infeksi TB laten",
        "Monitoring ketat selama pengobatan untuk efek samping obat anti-TB",
        "Vaksinasi BCG tidak direkomendasikan di negara dengan prevalensi TB rendah"
      ]
    },
    {
      organization: "IDAI (Ikatan Dokter Anak Indonesia)",
      title: "Pedoman IDAI untuk TB Anak",
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      content: [
        "Sistem skoring TB anak dengan 6 parameter utama untuk diagnosis",
        "Kontak TB dewasa BTA positif mendapat skor tertinggi (3 poin)",
        "Uji tuberkulin positif (≥10mm) atau reaksi vesikular mendapat 3 poin",
        "Status gizi buruk (BB/TB <70%) mendapat 3 poin",
        "Foto thoraks dengan gambaran TB jelas mendapat 3 poin",
        "Total skor ≥6: diagnosis TB sangat mungkin, mulai pengobatan OAT",
        "Skor 4-5: TB mungkin, perlu evaluasi lebih lanjut",
        "Skor <4: kemungkinan TB rendah, pertimbangkan diagnosis lain"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Pedoman TB Anak
              </CardTitle>
              <CardDescription>
                Pedoman dari WHO, CDC, dan IDAI untuk diagnosis dan penatalaksanaan TB anak
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {guidelines.map((guideline, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    {guideline.icon}
                    <span className="ml-2">{guideline.organization}</span>
                  </CardTitle>
                  <CardDescription className="font-medium">
                    {guideline.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guideline.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidelinesPage;
