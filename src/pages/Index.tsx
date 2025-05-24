import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, FileText, BarChart3, History } from "lucide-react";
import PatientForm from '@/components/PatientForm';
import ScoringAssessment from '@/components/ScoringAssessment';
import ResultsDashboard from '@/components/ResultsDashboard';
import ScoreHistory from '@/components/ScoreHistory';
import GuidelinesPage from '@/components/GuidelinesPage';
import BMICalculator from '@/components/BMICalculator';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [patientData, setPatientData] = useState(null);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handlePatientSubmit = (data) => {
    setPatientData(data);
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (results) => {
    setAssessmentResults(results);
    setCurrentView('results');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'patient-form':
        return <PatientForm onSubmit={handlePatientSubmit} />;
      case 'assessment':
        return (
          <ScoringAssessment 
            patientData={patientData} 
            onComplete={handleAssessmentComplete}
          />
        );
      case 'results':
        return (
          <ResultsDashboard 
            patientData={patientData}
            results={assessmentResults}
            onNewAssessment={() => setCurrentView('patient-form')}
          />
        );
      case 'history':
        return <ScoreHistory onBack={() => setCurrentView('home')} />;
      case 'guidelines':
        return <GuidelinesPage onBack={() => setCurrentView('home')} />;
      case 'bmi-calculator':
        return <BMICalculator onBack={() => setCurrentView('home')} />;
      default:
        return (
          <div className="w-full px-4 space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center mb-4">
                <Stethoscope className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mr-2 sm:mr-3" />
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Penilaian TB Anak</h1>
              </div>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Alat penilaian risiko tuberkulosis profesional untuk pasien anak.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
                onClick={() => setCurrentView('patient-form')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Penilaian Baru</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Mulai penilaian baru
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                onClick={() => setCurrentView('history')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <History className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Riwayat Skor</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Lihat penilaian sebelumnya
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-purple-500"
                onClick={() => setCurrentView('guidelines')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Pedoman</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Pedoman WHO, CDC & IDAI
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-orange-500"
                onClick={() => setCurrentView('bmi-calculator')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Alat Klinis</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Kalkulator BMI
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm sm:text-lg font-semibold text-blue-900 mb-1 sm:mb-2">Pemberitahuan Klinis</h3>
              <p className="text-xs sm:text-sm text-blue-800">
                Alat ini dirancang untuk membantu profesional kesehatan dalam pengambilan keputusan klinis. 
                Ini tidak boleh menggantikan penilaian klinis atau evaluasi pasien yang komprehensif.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto py-4 sm:py-8">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default Index;
