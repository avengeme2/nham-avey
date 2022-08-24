import { MapPinIcon } from '@heroicons/react/24/solid'

export interface LocationMarkerProps {
  lat?: number
  lng?: number
}

export const LocationMarker = (_props: LocationMarkerProps) => (
  <MapPinIcon className="h-10 w-10 text-primary" />
)

export default LocationMarker
