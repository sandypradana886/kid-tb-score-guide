
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
            <CardTitle className="text-2xl">Patient Information</CardTitle>
          </div>
          <CardDescription>
            Enter patient details for TB risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  placeholder="Enter patient identifier"
                  value={formData.patientId}
                  onChange={(e) => updateFormData('patientId', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessmentDate">Assessment Date</Label>
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
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Age Unit</Label>
                <Select value={formData.ageUnit} onValueChange={(value) => updateFormData('ageUnit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Weight in kg"
                  value={formData.weight}
                  onChange={(e) => updateFormData('weight', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Height in cm"
                  value={formData.height}
                  onChange={(e) => updateFormData('height', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/Facility</Label>
              <Input
                id="location"
                placeholder="Healthcare facility or location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Continue to Assessment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientForm;
