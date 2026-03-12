'use client';
import { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl'; // Will uncomment once installed
// import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {
// const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /*
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [113.9213, -0.7893], // Center on Indonesia
      zoom: 4,
    });

    return () => map.remove();
    */
  }, []);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
      {/* <div ref={mapContainer} className="absolute inset-0" /> */}
      <span className="text-gray-500 font-mono text-sm">(Mapbox Global Coverage Interactive Map)</span>
    </div>
  );
}
