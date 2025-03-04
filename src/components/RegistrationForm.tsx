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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid file (JPEG, PNG, or PDF)");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      setFormData((prev: FormData) => ({ ...prev, file }));
    }
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
                  <Label htmlFor="paymentProof">Proof of Payment</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      id="paymentProof"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="paymentProof"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-400 mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <span className="text-gray-400 mb-1">
                        {formData.file ? formData.file.name : "Click to upload payment proof"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        (JPEG, PNG, PDF - Max 5MB)
                      </span>
                    </label>
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
                <a href="mailto:info@sod2025.com" className="text-primary hover:underline">
                  info@sod2025.com
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