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
      category: "Clinical History",
      questions: [
        {
          id: "exposure",
          question: "History of TB exposure?",
          options: [
            { value: 0, label: "No known exposure", points: 0 },
            { value: 1, label: "Household contact", points: 2 },
            { value: 2, label: "Close contact with infectious TB", points: 3 }
          ]
        },
        {
          id: "symptoms",
          question: "Duration of symptoms?",
          options: [
            { value: 0, label: "No symptoms", points: 0 },
            { value: 1, label: "< 2 weeks", points: 1 },
            { value: 2, label: "2-4 weeks", points: 2 },
            { value: 3, label: "> 4 weeks", points: 3 }
          ]
        }
      ]
    },
    {
      category: "Physical Examination",
      questions: [
        {
          id: "nutrition",
          question: "Nutritional status?",
          options: [
            { value: 0, label: "Well nourished", points: 0 },
            { value: 1, label: "Mild malnutrition", points: 1 },
            { value: 2, label: "Moderate malnutrition", points: 2 },
            { value: 3, label: "Severe malnutrition", points: 3 }
          ]
        },
        {
          id: "lymphNodes",
          question: "Lymphadenopathy?",
          options: [
            { value: 0, label: "None", points: 0 },
            { value: 1, label: "< 2cm, mobile", points: 1 },
            { value: 2, label: "> 2cm or fixed", points: 2 }
          ]
        }
      ]
    },
    {
      category: "Investigations",
      questions: [
        {
          id: "tst",
          question: "Tuberculin Skin Test (TST) result?",
          options: [
            { value: 0, label: "< 5mm", points: 0 },
            { value: 1, label: "5-9mm", points: 1 },
            { value: 2, label: "10-14mm", points: 2 },
            { value: 3, label: "≥ 15mm", points: 3 }
          ]
        },
        {
          id: "xray",
          question: "Chest X-ray findings?",
          options: [
            { value: 0, label: "Normal", points: 0 },
            { value: 1, label: "Hilar lymphadenopathy", points: 2 },
            { value: 2, label: "Lung consolidation", points: 3 },
            { value: 3, label: "Cavitation", points: 4 }
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
    if (score <= 3) return { level: "Low", color: "green" };
    if (score <= 6) return { level: "Moderate", color: "yellow" };
    return { level: "High", color: "red" };
  };

  const isAnswered = scores[currentQuestion?.id];

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">TB Risk Assessment</CardTitle>
            <span className="text-sm text-gray-500">
              Question {currentStep + 1} of {allQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">{currentQuestion?.category}</h3>
            <p className="text-lg text-gray-900">{currentQuestion?.question}</p>
          </div>

          <RadioGroup
            value={scores[currentQuestion?.id]?.value?.toString() || ""}
            onValueChange={(value) => {
              const option = currentQuestion.options.find(opt => opt.value.toString() === value);
              if (option) {
                handleAnswer(currentQuestion.id, option.value, option.points);
              }
            }}
            className="space-y-3"
          >
            {currentQuestion?.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    <span className="text-sm font-medium text-blue-600">
                      {option.points} {option.points === 1 ? 'point' : 'points'}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === allQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoringAssessment;
