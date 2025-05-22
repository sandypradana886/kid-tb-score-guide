
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, FileText, BarChart3, History } from "lucide-react";
import PatientForm from '@/components/PatientForm';
import ScoringAssessment from '@/components/ScoringAssessment';
import ResultsDashboard from '@/components/ResultsDashboard';
import ScoreHistory from '@/components/ScoreHistory';

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
      default:
        return (
          <div className="w-full px-4 space-y-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center mb-4">
                <Stethoscope className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mr-2 sm:mr-3" />
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Pediatric TB Scoring</h1>
              </div>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Professional tuberculosis risk assessment tool for pediatric patients.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
                onClick={() => setCurrentView('patient-form')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">New Assessment</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Start a new assessment
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                onClick={() => setCurrentView('history')}
              >
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <History className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Score History</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    View previous assessments
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    WHO & CDC guidelines
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="text-center py-3 px-2 sm:p-6">
                  <Stethoscope className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-1 sm:mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-2 sm:p-6">
                  <CardDescription className="text-center text-xs sm:text-sm">
                    Clinical tools
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm sm:text-lg font-semibold text-blue-900 mb-1 sm:mb-2">Clinical Notice</h3>
              <p className="text-xs sm:text-sm text-blue-800">
                This tool is designed to assist healthcare professionals in clinical decision-making. 
                It should not replace clinical judgment or comprehensive patient evaluation.
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
