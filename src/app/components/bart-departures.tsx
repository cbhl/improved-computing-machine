"use client";

/**
 * The v0 prompt for this component was:
 * 
 * write a component that fetches the upcoming BART departures from 
 * https://api.bart.gov/api/etd.aspx?cmd=etd&orig=EMBR&key= MW9S-E7SL-26DU-VV8V&json=y 
 * once per minute. Group them by platform and sort them by eta. then display the color, 
 * the destination station, and the eta. list at most four entries per platform.
 */

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Departure {
  destination: string;
  abbreviation: string;
  limited: number;
  estimate: {
    minutes: string;
    platform: string;
    direction: string;
    length: string;
    color: string;
    hexcolor: string;
    bikeflag: string;
    delay: string;
  }[];
}

interface GroupedDepartures {
  [platform: string]: {
    color: string;
    destination: string;
    eta: string;
  }[];
}

export default function BartDepartures() {
  const [departures, setDepartures] = useState<GroupedDepartures>({});

  const fetchDepartures = async () => {
    try {
      const response = await fetch(
        "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=EMBR&key=MW9S-E7SL-26DU-VV8V&json=y"
      );
      const data = await response.json();

      const grouped: GroupedDepartures = {};

      data.root.station[0].etd.forEach((departure: Departure) => {
        departure.estimate.forEach((estimate) => {
          const platform = estimate.platform;
          if (!grouped[platform]) {
            grouped[platform] = [];
          }

          grouped[platform].push({
            color: estimate.hexcolor,
            destination: departure.destination,
            eta: estimate.minutes,
          });
        });
      });

      // Sort departures by ETA and limit to 4 per platform
      Object.keys(grouped).forEach((platform) => {
        grouped[platform] = grouped[platform]
          .sort((a, b) => {
            if (a.eta === "Leaving") return -1;
            if (b.eta === "Leaving") return 1;
            return parseInt(a.eta) - parseInt(b.eta);
          })
          .slice(0, 4);
      });

      setDepartures(grouped);
    } catch (error) {
      console.error("Error fetching BART departures:", error);
    }
  };

  useEffect(() => {
    fetchDepartures();
    const interval = setInterval(fetchDepartures, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        BART Departures - Embarcadero Station
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(departures).map(([platform, platformDepartures]) => (
          <Card key={platform}>
            <CardHeader>
              <CardTitle>Platform {platform}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {platformDepartures.map((departure, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge
                        style={{ backgroundColor: departure.color }}
                        className="mr-2 w-4 h-4 rounded-full"
                      />
                      <span>{departure.destination}</span>
                    </div>
                    <span className="font-semibold">
                      {departure.eta === "Leaving"
                        ? "Leaving"
                        : `${departure.eta} min`}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
