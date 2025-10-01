import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Minus, Plus, X, MapPin, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default marker icon
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  onOrderConfirmed?: (order: any) => void;
}

const defaultCenter = { lat: 13.0827, lng: 80.2707 }; // Chennai

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  onOrderConfirmed,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [paymentMode, setPaymentMode] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const totalPrice = quantity * productPrice;

  useEffect(() => {
    const savedLocation = localStorage.getItem('lastLocation');
    const lat = localStorage.getItem('lastLat');
    const lng = localStorage.getItem('lastLng');
    if (savedLocation && lat && lng) {
      setLocation(savedLocation);
      setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem('lastLocation', location);
      localStorage.setItem('lastLat', markerPosition.lat.toString());
      localStorage.setItem('lastLng', markerPosition.lng.toString());
    }
  }, [location, markerPosition]);

  useEffect(() => {
    if (isOpen && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200);
    }
  }, [isOpen]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      setLocation(data.display_name || '');
    } catch (error) {
      console.error('Reverse geocoding failed', error);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 18, {
              animate: true,
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Location permission denied or not available.');
        }
      );
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setMarkerPosition({ lat, lng });
        reverseGeocode(lat, lng);
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 18, { animate: true });
        }
      },
    });

    return <Marker position={markerPosition} />;
  };

  const handleConfirmOrder = () => {
    if (!phone || !location || !paymentMode) {
      alert('Please fill all required fields.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: productName,
        quantity,
        phone,
        location,
        latitude: markerPosition.lat,
        longitude: markerPosition.lng,
        payment_mode: paymentMode,
        total_price: totalPrice,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Something went wrong');

        setOrderId(data.order_id);
        setShowSuccessDialog(true);
        if (onOrderConfirmed) onOrderConfirmed(data);
        onClose();
      })
      .catch((err) => {
        alert(`❌ Failed to place order: ${err.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

          <div
            className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full z-10 relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <Dialog.Title className="text-2xl font-bold text-gray-800">
              Order: {productName}
            </Dialog.Title>

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-1 space-x-3">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Minus className="text-green-600 w-4 h-4" />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="text-green-600 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              placeholder="Customer Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Location
              </label>
              <button
                onClick={handleUseMyLocation}
                className="mb-2 text-blue-600 text-sm underline flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" /> Use My Current Location
              </button>
              <input
                type="text"
                value={location}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-sm"
              />
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-gray-300 min-h-[300px] mb-3">
              <MapContainer
                center={markerPosition}
                zoom={18}
                scrollWheelZoom={false}
                style={{ height: '300px', width: '100%' }}
                ref={(mapInstance) => {
                  if (mapInstance) {
                    mapRef.current = mapInstance;
                    setTimeout(() => mapInstance.invalidateSize(), 200);
                  }
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker />
              </MapContainer>
            </div>

            {/* Payment Mode */}
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Payment Mode</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
            </select>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-orange-600 font-bold text-xl">₹{totalPrice}</span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSuccessDialog(false)}
          />
          <div
            className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full z-10 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </Dialog.Title>
            <p className="text-gray-600 mb-4">
              Your order ID is <strong>#{orderId}</strong>.<br /> You can view your bill in the
              "My Orders" section.
            </p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default OrderModal;
