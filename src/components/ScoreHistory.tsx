
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, TrendingUp, User } from "lucide-react";

const ScoreHistory = ({ onBack }) => {
  // Mock data for demonstration
  const [assessmentHistory] = useState([
    {
      id: 1,
      patientId: "TB-001",
      date: "2024-01-15",
      score: 8,
      maxScore: 15,
      riskLevel: "Tinggi",
      age: "5 tahun"
    },
    {
      id: 2,
      patientId: "TB-002",
      date: "2024-01-14",
      score: 4,
      maxScore: 15,
      riskLevel: "Sedang",
      age: "3 tahun"
    },
    {
      id: 3,
      patientId: "TB-003",
      date: "2024-01-13",
      score: 2,
      maxScore: 15,
      riskLevel: "Rendah",
      age: "7 tahun"
    }
  ]);

  const getRiskColor = (level) => {
    switch (level) {
      case "Rendah": return "bg-green-100 text-green-800";
      case "Sedang": return "bg-yellow-100 text-yellow-800";
      case "Tinggi": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Riwayat Penilaian
              </CardTitle>
              <CardDescription>
                Penilaian risiko TB dan skor sebelumnya
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ditemukan penilaian sebelumnya</p>
              </div>
            ) : (
              assessmentHistory.map((assessment) => (
                <Card key={assessment.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <User className="h-4 w-4 mr-1" />
                          ID Pasien
                        </div>
                        <p className="font-semibold">{assessment.patientId}</p>
                        <p className="text-sm text-gray-600">{assessment.age}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Tanggal Penilaian
                        </div>
                        <p className="font-semibold">
                          {new Date(assessment.date).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Skor Risiko
                        </div>
                        <p className="font-semibold text-lg">
                          {assessment.score}/{assessment.maxScore}
                        </p>
                        <p className="text-sm text-gray-600">
                          {((assessment.score / assessment.maxScore) * 100).toFixed(0)}%
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Badge className={getRiskColor(assessment.riskLevel)}>
                          Risiko {assessment.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreHistory;
