
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from "lucide-react";

interface Option {
  value: number;
  label: string;
  points: number;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  category?: string;
}

interface Category {
  category: string;
  questions: Question[];
}

interface Score {
  value: number;
  points: number;
}

interface Scores {
  [key: string]: Score;
}

const ScoringAssessment = ({ patientData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});

  const assessmentCriteria: Category[] = [
    {
      category: "Riwayat Klinis",
      questions: [
        {
          id: "exposure",
          question: "Riwayat paparan TB?",
          options: [
            { value: 0, label: "Tidak ada paparan yang diketahui", points: 0 },
            { value: 1, label: "Kontak rumah tangga", points: 2 },
            { value: 2, label: "Kontak dekat dengan TB menular", points: 3 }
          ]
        },
        {
          id: "symptoms",
          question: "Durasi gejala?",
          options: [
            { value: 0, label: "Tidak ada gejala", points: 0 },
            { value: 1, label: "< 2 minggu", points: 1 },
            { value: 2, label: "2-4 minggu", points: 2 },
            { value: 3, label: "> 4 minggu", points: 3 }
          ]
        }
      ]
    },
    {
      category: "Pemeriksaan Fisik",
      questions: [
        {
          id: "nutrition",
          question: "Status gizi?",
          options: [
            { value: 0, label: "Gizi baik", points: 0 },
            { value: 1, label: "Gizi kurang ringan", points: 1 },
            { value: 2, label: "Gizi kurang sedang", points: 2 },
            { value: 3, label: "Gizi kurang berat", points: 3 }
          ]
        },
        {
          id: "lymphNodes",
          question: "Limfadenopati?",
          options: [
            { value: 0, label: "Tidak ada", points: 0 },
            { value: 1, label: "< 2cm, mobil", points: 1 },
            { value: 2, label: "> 2cm atau tetap", points: 2 }
          ]
        }
      ]
    },
    {
      category: "Investigasi",
      questions: [
        {
          id: "tst",
          question: "Hasil Tes Tuberkulin (TST)?",
          options: [
            { value: 0, label: "< 5mm", points: 0 },
            { value: 1, label: "5-9mm", points: 1 },
            { value: 2, label: "10-14mm", points: 2 },
            { value: 3, label: "≥ 15mm", points: 3 }
          ]
        },
        {
          id: "xray",
          question: "Temuan Foto Toraks?",
          options: [
            { value: 0, label: "Normal", points: 0 },
            { value: 1, label: "Pembesaran kelenjar hilus", points: 2 },
            { value: 2, label: "Konsolidasi paru", points: 3 },
            { value: 3, label: "Kavitasi", points: 4 }
          ]
        }
      ]
    }
  ];

  const allQuestions = assessmentCriteria.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.category }))
  );

  const currentQuestion = allQuestions[currentStep];
  const progress = ((currentStep + 1) / allQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: number, points: number) => {
    setScores(prev => ({
      ...prev,
      [questionId]: { value, points }
    }));
  };

  const handleNext = () => {
    if (currentStep < allQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final score and complete assessment
      const totalScore = Object.values(scores).reduce((sum, item) => sum + item.points, 0);
      const maxPossibleScore = allQuestions.reduce((sum, q) => 
        sum + Math.max(...q.options.map(opt => opt.points)), 0
      );
      
      const results = {
        totalScore,
        maxPossibleScore,
        riskLevel: getRiskLevel(totalScore),
        detailedScores: scores,
        assessmentDate: new Date().toISOString()
      };
      
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRiskLevel = (score) => {
    if (score <= 3) return { level: "Rendah", color: "green" };
    if (score <= 6) return { level: "Sedang", color: "yellow" };
    return { level: "Tinggi", color: "red" };
  };

  const isAnswered = scores[currentQuestion?.id];

  return (
    <div className="w-full px-2 sm:max-w-3xl sm:mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg sm:text-xl">Penilaian Risiko TB</CardTitle>
            <span className="text-xs sm:text-sm text-gray-500">
              {currentStep + 1} / {allQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-blue-900 text-sm sm:text-base mb-1 sm:mb-2">{currentQuestion?.category}</h3>
            <p className="text-base sm:text-lg text-gray-900">{currentQuestion?.question}</p>
          </div>

          <RadioGroup
            value={scores[currentQuestion?.id]?.value?.toString() || ""}
            onValueChange={(value) => {
              const option = currentQuestion.options.find(opt => opt.value.toString() === value);
              if (option) {
                handleAnswer(currentQuestion.id, option.value, option.points);
              }
            }}
            className="space-y-2 sm:space-y-3"
          >
            {currentQuestion?.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    <span className="text-xs sm:text-sm font-medium text-blue-600">
                      {option.points} {option.points === 1 ? 'poin' : 'poin'}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4 mt-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center px-2 sm:px-4"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">Sebelumnya</span>
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center bg-blue-600 hover:bg-blue-700 px-2 sm:px-4"
              size="sm"
            >
              <span className="text-sm">
                {currentStep === allQuestions.length - 1 ? 'Selesai' : 'Selanjutnya'}
              </span>
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoringAssessment;
