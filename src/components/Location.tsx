"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Location() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Venue</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us on March 6, 2025 at the New Joko Hotel, Achimota. Explore the wonderful combination of friendship and fun with the people who make your life better.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden glass-effect gold-border">
              <div className="relative aspect-video">
                <Image 
                  src="/happy1.webp"
                  alt="Friends laughing and enjoying the party"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">A Friendly Gathering</h3>
            <p className="text-gray-300">
              Our venue embodies the warmth and vibrancy of Ghanaian hospitality. Nestled in a serene environment, 
              it offers the perfect backdrop for meaningful connections and joyful celebrations with your classmates.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Exclusive Event</h3>
              <p className="text-gray-400">
                SOD 2025 will take place at the New Joko Hotel, Achimota, featuring spacious indoor and outdoor areas, a swimming pool, and comfortable spaces for all planned activities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Amenities</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Swimming pool
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Comfortable seating for talks and discussions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Karaoke setup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Card and board games
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Movie screening area
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Video game consoles
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Getting There</h3>
              <p className="text-gray-400">
                Transportation details and directions will be provided to confirmed attendees closer to the event date. Parking information will be included.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 