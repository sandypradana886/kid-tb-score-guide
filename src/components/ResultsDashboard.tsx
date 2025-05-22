
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  RotateCcw,
  TrendingUp,
  User,
  Calendar
} from "lucide-react";

const ResultsDashboard = ({ patientData, results, onNewAssessment }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      case "Moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRecommendations = (riskLevel) => {
    switch (riskLevel) {
      case "Low":
        return [
          "Continue routine monitoring",
          "Provide preventive education",
          "Schedule regular follow-ups",
          "Monitor for symptom development"
        ];
      case "Moderate":
        return [
          "Consider additional investigations",
          "Close monitoring required",
          "Evaluate for latent TB infection",
          "Consider preventive therapy",
          "Weekly follow-up recommended"
        ];
      case "High":
        return [
          "Urgent clinical evaluation required",
          "Consider active TB treatment",
          "Isolation precautions if indicated",
          "Comprehensive diagnostic workup",
          "Immediate specialist referral"
        ];
      default:
        return [];
    }
  };

  const scorePercentage = (results.totalScore / results.maxPossibleScore) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Assessment Results
          </CardTitle>
          <CardDescription>
            Pediatric TB Risk Assessment completed on {new Date(results.assessmentDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Patient Info & Score Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Patient ID:</span>
              <span>{patientData.patientId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Age:</span>
              <span>{patientData.age} {patientData.ageUnit}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Gender:</span>
              <span className="capitalize">{patientData.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Weight:</span>
              <span>{patientData.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Height:</span>
              <span>{patientData.height} cm</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {results.totalScore}/{results.maxPossibleScore}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {scorePercentage.toFixed(0)}% of maximum risk score
              </div>
              <Badge className={`text-lg px-4 py-2 ${getRiskColor(results.riskLevel.level)}`}>
                {results.riskLevel.level} Risk
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alert */}
      <Alert className={`border-l-4 ${
        results.riskLevel.level === "High" ? "border-l-red-500 bg-red-50" :
        results.riskLevel.level === "Moderate" ? "border-l-yellow-500 bg-yellow-50" :
        "border-l-green-500 bg-green-50"
      }`}>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="font-medium">
          {results.riskLevel.level === "High" && "High TB risk detected. Immediate clinical evaluation recommended."}
          {results.riskLevel.level === "Moderate" && "Moderate TB risk. Close monitoring and additional evaluation may be needed."}
          {results.riskLevel.level === "Low" && "Low TB risk. Continue routine monitoring and preventive measures."}
        </AlertDescription>
      </Alert>

      {/* Clinical Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Clinical Recommendations
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
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={() => window.print()}>
          <FileText className="h-4 w-4 mr-2" />
          Print Report
        </Button>
        <Button onClick={onNewAssessment} className="bg-blue-600 hover:bg-blue-700">
          <RotateCcw className="h-4 w-4 mr-2" />
          New Assessment
        </Button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
