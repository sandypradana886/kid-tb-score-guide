
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calculator, User, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BMICalculator = ({ onBack }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: ''
  });
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // convert cm to m
    const age = parseInt(formData.age);

    if (!weight || !height || !age) return;

    const bmi = weight / (height * height);
    
    // BMI interpretation for children (simplified)
    let category = '';
    let color = '';
    let recommendation = '';

    if (age < 2) {
      // For children under 2, use WHO growth charts
      if (bmi < 16) {
        category = 'Gizi Buruk';
        color = 'bg-red-100 text-red-800';
        recommendation = 'Konsultasi segera dengan dokter untuk evaluasi gizi';
      } else if (bmi < 18.5) {
        category = 'Gizi Kurang';
        color = 'bg-yellow-100 text-yellow-800';
        recommendation = 'Perlu peningkatan asupan gizi dan pemantauan rutin';
      } else if (bmi < 25) {
        category = 'Gizi Baik';
        color = 'bg-green-100 text-green-800';
        recommendation = 'Pertahankan pola makan sehat dan aktivitas fisik';
      } else {
        category = 'Gizi Lebih';
        color = 'bg-orange-100 text-orange-800';
        recommendation = 'Konsultasi dengan ahli gizi untuk penyesuaian diet';
      }
    } else {
      // For children 2 years and above
      if (bmi < 14) {
        category = 'Gizi Buruk';
        color = 'bg-red-100 text-red-800';
        recommendation = 'Konsultasi segera dengan dokter untuk evaluasi gizi';
      } else if (bmi < 18.5) {
        category = 'Gizi Kurang';
        color = 'bg-yellow-100 text-yellow-800';
        recommendation = 'Perlu peningkatan asupan gizi dan pemantauan rutin';
      } else if (bmi < 25) {
        category = 'Gizi Baik';
        color = 'bg-green-100 text-green-800';
        recommendation = 'Pertahankan pola makan sehat dan aktivitas fisik';
      } else if (bmi < 30) {
        category = 'Gizi Lebih';
        color = 'bg-orange-100 text-orange-800';
        recommendation = 'Konsultasi dengan ahli gizi untuk penyesuaian diet';
      } else {
        category = 'Obesitas';
        color = 'bg-red-100 text-red-800';
        recommendation = 'Konsultasi segera dengan dokter dan ahli gizi';
      }
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      recommendation
    });
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Kalkulator BMI Anak
              </CardTitle>
              <CardDescription>
                Hitung Body Mass Index untuk evaluasi status gizi anak
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Berat Badan (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Masukkan berat badan"
                value={formData.weight}
                onChange={(e) => updateFormData('weight', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Tinggi Badan (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Masukkan tinggi badan"
                value={formData.height}
                onChange={(e) => updateFormData('height', e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Usia (tahun)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Masukkan usia"
                value={formData.age}
                onChange={(e) => updateFormData('age', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Jenis Kelamin</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={calculateBMI} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!formData.weight || !formData.height || !formData.age}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Hitung BMI
          </Button>

          {result && (
            <Card className="mt-6 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Hasil Perhitungan BMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {result.bmi}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Body Mass Index
                  </div>
                  <Badge className={`text-lg px-4 py-2 ${result.color}`}>
                    {result.category}
                  </Badge>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Rekomendasi:</h4>
                  <p className="text-sm text-blue-800">{result.recommendation}</p>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  *Hasil ini hanya sebagai referensi. Konsultasikan dengan dokter untuk evaluasi yang lebih komprehensif.
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BMICalculator;
