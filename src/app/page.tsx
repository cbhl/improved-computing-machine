"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import BartDepartures from './components/bart-departures'

interface Announcement {
  heading: string;
  content: React.ReactNode; 
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
    },
    {
      heading: "The Road to 30!",
      content: <div className="flex justify-around items-center flex-wrap">
        <div className="max-w-[120px] m-2">
          <Image src="/customers/ChangeOrg_White.png" alt="ChangeOrg Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2">
          <Image src="/customers/airbyte-logo.svg" alt="Airbyte Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2 filter brightness-200">
          <Image src="/customers/atropos-logo.png" alt="Atropos Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2">
          <Image src="/customers/logo-datasite-light.svg" alt="Datasite Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2 filter invert hue-rotate-180">
          <Image src="/customers/sincera-logo.png" alt="Sincera Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2">
          <Image src="/customers/superintelligent-logo.png" alt="Superintelligent Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2">
          <Image src="/customers/sygma-logo.png" alt="Sygma Logo" layout="responsive" width={120} height={60} />
        </div>
        <div className="max-w-[120px] m-2">
          <Image src="/customers/zapier-logo_white.svg" alt="Zapier Logo" layout="responsive" width={120} height={60} />
        </div>
      </div>
    }
  ]
}

export default function Home() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000) 
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
      <div className="absolute bottom-12
       right-0 p-4">
        <BartDepartures />
      </div>
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