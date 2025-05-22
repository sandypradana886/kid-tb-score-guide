
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-6">
                <Stethoscope className="h-12 w-12 text-blue-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-900">Pediatric TB Scoring</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional tuberculosis risk assessment tool for pediatric patients. 
                Evidence-based scoring system for healthcare professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
                onClick={() => setCurrentView('patient-form')}
              >
                <CardHeader className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">New Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Start a new pediatric TB risk assessment
                  </CardDescription>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                onClick={() => setCurrentView('history')}
              >
                <CardHeader className="text-center">
                  <History className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Score History</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    View previous assessments and trends
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="text-center">
                  <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    WHO & CDC pediatric TB guidelines
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="text-center">
                  <Stethoscope className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Clinical tools and references
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Clinical Notice</h3>
              <p className="text-blue-800">
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
      <div className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default Index;
