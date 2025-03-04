"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Define interfaces for better type safety
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cohort: string;
  file: File | null;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cohort: "Cohort 1",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed", e);
    
    // Reset file if the input was cleared
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected or file selection cleared");
      setFormData(prev => ({ ...prev, file: null }));
      return;
    }
    
    const file = e.target.files[0];
    console.log("File selected:", file.name, file.type, file.size);
    
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      toast.error("Please upload a valid file (JPEG, PNG, or PDF)");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large:", file.size);
      toast.error("File size should be less than 5MB");
      return;
    }
    
    console.log("Setting file in form data");
    setFormData(prev => ({ ...prev, file }));
    toast.success(`File "${file.name}" selected`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.file) {
      toast.error("Please fill in all required fields and upload payment proof");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert file to base64
      const fileReader = new FileReader();
      const filePromise = new Promise<string>((resolve, reject) => {
        fileReader.onload = () => {
          console.log('File converted to base64'); // Debug log
          resolve(fileReader.result as string);
        };
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsDataURL(formData.file!);
      });
      
      const fileData = await filePromise;
      console.log('File type:', formData.file.type); // Debug log
      console.log('File name:', formData.file.name); // Debug log
      
      const formPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cohort: formData.cohort,
        timestamp: new Date().toISOString(),
        fileData: fileData,
        fileName: formData.file.name,
        fileType: formData.file.type
      };

      console.log('Submitting registration with file...'); // Debug log

      const sheetResponse = await fetch('https://script.google.com/macros/s/AKfycbxjd0eb0QwdqowFxAc3IV370K3B0T8eplr_zQ2O1dDhIMrgJcm4_v54k5GhxWa-BcCw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
      });

      console.log('Response received:', sheetResponse); // Debug log

      // Since we're using no-cors, assume success if we get here
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        cohort: "Cohort 1",
        file: null,
      });
      
      toast.success("Registration submitted successfully! Your payment proof has been uploaded.");

    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render anything until client-side
  if (!isClient) {
    return null;
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Register for SOD 2025</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Secure your spot at Ghana's most exclusive house party for MSc Business Analytics students.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Registration Form</CardTitle>
              <CardDescription>
                Fill out the form below and upload your proof of payment to register for the event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="bg-black/50 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="bg-black/50 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="bg-black/50 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="bg-black/50 border-gray-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cohort">Cohort</Label>
                  <select
                    id="cohort"
                    name="cohort"
                    value={formData.cohort}
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-black/50 border border-gray-700 text-white p-2"
                    required
                  >
                    <option value="Cohort 1">Cohort 1</option>
                    <option value="Cohort 2">Cohort 2</option>
                    <option value="Cohort 3">Cohort 3</option>
                    <option value="Cohort 4">Cohort 4</option>
                    <option value="Cohort 5">Cohort 5</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentProof">Payment Proof</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="paymentProof"
                      name="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="block w-full text-white file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-primary file:text-white hover:file:bg-primary/80"
                    />
                    <p className="mt-2 text-gray-500 text-sm">
                      {formData.file ? `Selected: ${formData.file.name}` : "JPEG, PNG, PDF - Max 5MB"}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/80 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Register Now"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t border-gray-800 flex flex-col items-start">
              <p className="text-sm text-gray-400 mt-4">
                By registering, you agree to our terms and conditions. Your payment will be verified
                within 24-48 hours, after which you'll receive your event pass via email.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                For payment details, please contact us at{" "}
                <a href="mailto:steamoffdaycation@gmail.com" className="text-primary hover:underline">
                  steamoffdaycation@gmail.com
                </a>
              </p>
              <p className="text-gray-500 mt-2">
                <span className="text-primary">Created by Eleazer Quayson</span> with ❤️
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
} 