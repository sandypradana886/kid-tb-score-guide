
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Calendar, MapPin } from "lucide-react";

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    age: '',
    ageUnit: 'years',
    gender: '',
    weight: '',
    height: '',
    location: '',
    assessmentDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl">Informasi Pasien</CardTitle>
          </div>
          <CardDescription>
            Masukkan data pasien untuk penilaian risiko TB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">ID Pasien</Label>
                <Input
                  id="patientId"
                  placeholder="Masukkan ID pasien"
                  value={formData.patientId}
                  onChange={(e) => updateFormData('patientId', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessmentDate">Tanggal Penilaian</Label>
                <Input
                  id="assessmentDate"
                  type="date"
                  value={formData.assessmentDate}
                  onChange={(e) => updateFormData('assessmentDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Usia</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Usia"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Satuan Usia</Label>
                <Select value={formData.ageUnit} onValueChange={(value) => updateFormData('ageUnit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="months">Bulan</SelectItem>
                    <SelectItem value="years">Tahun</SelectItem>
                  </SelectContent>
                </Select>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Berat Badan (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Berat dalam kg"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Tinggi Badan (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Tinggi dalam cm"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi/Fasilitas</Label>
              <Input
                id="location"
                placeholder="Fasilitas kesehatan atau lokasi"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Lanjutkan ke Penilaian
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientForm;
