import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import html2pdf from 'html2pdf.js';
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  RotateCcw,
  TrendingUp,
  User
} from "lucide-react";

const ResultsDashboard = ({ patientData, results, onNewAssessment }) => {
  const reportRef = useRef();

  const getRiskColor = (level) => {
    switch (level) {
      case "Rendah": return "bg-green-100 text-green-800 border-green-200";
      case "Sedang": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Tinggi": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRecommendations = (riskLevel) => {
    switch (riskLevel) {
      case "Rendah":
        return [
          "Lanjutkan pemantauan rutin",
          "Berikan edukasi pencegahan TB",
          "Jadwalkan kontrol sesuai kebutuhan",
          "Periksa ulang jika muncul gejala TB"
        ];
      case "Sedang":
        return [
          "Pertimbangkan pemeriksaan bakteriologis",
          "Pantau perkembangan gejala secara ketat",
          "Evaluasi untuk infeksi TB laten",
          "Kontrol setiap 2-4 minggu",
          "Konsultasi ke dokter spesialis anak"
        ];
      case "Tinggi":
        return [
          "Rujuk ke dokter spesialis anak segera",
          "Pertimbangkan pemeriksaan bakteriologis menyeluruh",
          "Mulai pengobatan OAT sesuai pedoman IDAI",
          "Lakukan pemantauan ketat efek samping obat",
          "Evaluasi ulang respons terapi dalam 2 minggu"
        ];
      default:
        return [];
    }
  };

  const getInterpretation = (score) => {
    if (score >= 6) {
      return "Skor ≥ 6: Diagnosis TB sangat mungkin. Pengobatan OAT direkomendasikan.";
    } else if (score >= 4) {
      return "Skor 4-5: TB mungkin. Dibutuhkan evaluasi lebih lanjut atau pemantauan ketat.";
    } else {
      return "Skor < 4: Kemungkinan TB rendah. Pertimbangkan diagnosis lain.";
    }
  };

  const scorePercentage = (results.totalScore / results.maxPossibleScore) * 100;

  const handleDownloadPDF = () => {
    const opt = {
      margin: 0.5,
      filename: `laporan-penilaian-${patientData.patientId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(reportRef.current).outputPdf('dataurlnewwindow');

  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" ref={reportRef}>
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Hasil Penilaian
          </CardTitle>
          <CardDescription>
            Penilaian Risiko TB Anak sesuai Pedoman IDAI - selesai pada {new Date(results.assessmentDate).toLocaleDateString('id-ID')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Patient Info & Score Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informasi Pasien
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="font-medium">ID Pasien:</span><span>{patientData.patientId}</span></div>
            <div className="flex justify-between"><span className="font-medium">Usia:</span><span>{patientData.age} {patientData.ageUnit === 'years' ? 'tahun' : 'bulan'}</span></div>
            <div className="flex justify-between"><span className="font-medium">Jenis Kelamin:</span><span>{patientData.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</span></div>
            <div className="flex justify-between"><span className="font-medium">Berat Badan:</span><span>{patientData.weight} kg</span></div>
            <div className="flex justify-between"><span className="font-medium">Tinggi Badan:</span><span>{patientData.height} cm</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Skor Risiko TB
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {results.totalScore}/{results.maxPossibleScore}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {scorePercentage.toFixed(0)}% dari skor risiko maksimum
              </div>
              <Badge className={`text-lg px-4 py-2 ${getRiskColor(results.riskLevel.level)}`}>
                Risiko {results.riskLevel.level}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alert */}
      <Alert className={`border-l-4 ${
        results.riskLevel.level === "Tinggi" ? "border-l-red-500 bg-red-50" :
        results.riskLevel.level === "Sedang" ? "border-l-yellow-500 bg-yellow-50" :
        "border-l-green-500 bg-green-50"
      }`}>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium">
            {getInterpretation(results.totalScore)}
          </p>
        </AlertDescription>
      </Alert>

      {/* Clinical Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Rekomendasi Klinis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {getRecommendations(results.riskLevel.level).map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-center print:hidden">
        <Button variant="outline" onClick={handleDownloadPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Cetak Laporan
        </Button>
        <Button onClick={onNewAssessment} className="bg-blue-600 hover:bg-blue-700">
          <RotateCcw className="h-4 w-4 mr-2" />
          Penilaian Baru
        </Button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
