"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Announcement {
  heading: string;
  content: React.ReactNode; // Changed from subheading to content
}

interface Config {
  title: string;
  announcements: Announcement[];
}

const config: Config = {
  title: "",
  announcements: [
    {
      heading: "Monday",
      content: <ul>
        <li>Weekly project reviews</li>
      </ul>
    },
    {
      heading: "Thursday",
      content: <ul>
        <li>10 am - Team meeting</li>
        <li>12 pm - Weekly project chat</li>
      </ul>
    }
  ]
}

export default function Home() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen p-6 relative" style={{ backgroundColor: '#010A26', color: '#FFFFFF' }}>
      <header className="flex justify-between items-center mb-8">
        <Image src="/logo-dark.avif" alt="Logo" width={500} height={83} />
        <div className="text-6xl">
          {formatTime(time)}
        </div>
      </header>
      <main>
        <h1 className="text-3xl mb-6 text-white display:none">
          {config.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 display:none">
          {config.announcements.map((announcement, index) => (
            <div key={index} className="bg-opacity-10 bg-white p-6 rounded-lg border border-white border-opacity-20 text-white">
              <h2 className="text-xl mb-4">{announcement.heading}</h2>
              <div className="text-sm opacity-80">{announcement.content}</div>
            </div>
          ))}
        </div>
      </main>
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 100 24" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 24 Q 12.5 0, 25 12 T 50 12 T 75 12 T 100 12 L 100 24 Z" fill="#DE94F2" />
          <path d="M0 24 Q 12.5 5, 25 17 T 50 17 T 75 17 T 100 17 L 100 24 Z" fill="#9D85F2" />
          <path d="M0 24 Q 12.5 10, 25 22 T 50 22 T 75 22 T 100 22 L 100 24 Z" fill="#403E8C" />
          <path d="M0 24 L 0 23 Q 12.5 15, 25 23 T 50 23 T 75 23 T 100 23 L 100 24 Z" fill="#79D0F2" />
        </svg>
      </div>
    </div>
  )
}