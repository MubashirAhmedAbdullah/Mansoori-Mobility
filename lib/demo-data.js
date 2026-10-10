export const freightLoads = [
  { id: "FR-10482", origin: "Karachi", destination: "Lahore", pickup: "Today, 4:00 PM", cargo: "Electronics · 4.5 tons", vehicle: "Covered truck", price: 148000, status: "Open for quotes", rating: 4.9 },
  { id: "FR-10479", origin: "Karachi", destination: "Hyderabad", pickup: "Tomorrow, 9:00 AM", cargo: "Packaged goods · 2 tons", vehicle: "Shehzore", price: 42000, status: "Open for quotes", rating: 4.8 },
  { id: "FR-10471", origin: "Lahore", destination: "Islamabad", pickup: "12 Oct, 8:30 AM", cargo: "Furniture · 1.5 tons", vehicle: "Mazda / loader", price: 37500, status: "Open for quotes", rating: 4.7 },
  { id: "FR-10465", origin: "Faisalabad", destination: "Karachi", pickup: "13 Oct, 10:00 AM", cargo: "Textiles · 8 tons", vehicle: "10-wheel truck", price: 186000, status: "Open for quotes", rating: 4.9 },
  { id: "FR-10451", origin: "Islamabad", destination: "Peshawar", pickup: "14 Oct, 7:00 AM", cargo: "Retail stock · 1 ton", vehicle: "Pickup / loader", price: 22500, status: "Open for quotes", rating: 4.8 },
  { id: "FR-10440", origin: "Multan", destination: "Lahore", pickup: "15 Oct, 8:00 AM", cargo: "Agricultural goods · 6 tons", vehicle: "Cargo truck", price: 79000, status: "Open for quotes", rating: 4.6 }
];

export const rentalVehicles = [
  { id: "CAR-01", name: "Toyota Corolla Altis", category: "Sedan", city: "Karachi", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 9500, rating: 4.9, trips: 38, image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1200&q=85", tag: "Popular choice" },
  { id: "CAR-02", name: "Honda Civic Oriel", category: "Sedan", city: "Lahore", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 12500, rating: 4.8, trips: 24, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85", tag: "Premium comfort" },
  { id: "CAR-03", name: "Toyota Fortuner", category: "SUV", city: "Islamabad", seats: 7, transmission: "Automatic", fuel: "Diesel", rate: 22500, rating: 5.0, trips: 19, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85", tag: "Family favourite" },
  { id: "CAR-04", name: "Suzuki Swift GLX", category: "Hatchback", city: "Karachi", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 6500, rating: 4.7, trips: 42, image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85", tag: "City friendly" },
  { id: "CAR-05", name: "Kia Sportage AWD", category: "SUV", city: "Lahore", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 15500, rating: 4.8, trips: 21, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85", tag: "Road-trip ready" },
  { id: "CAR-06", name: "Toyota Yaris ATIV", category: "Sedan", city: "Rawalpindi", seats: 5, transmission: "Automatic", fuel: "Petrol", rate: 8000, rating: 4.8, trips: 31, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85", tag: "Great value" }
];

export const recentShipments = [
  { ref: "FR-10482", route: "Karachi → Lahore", carrier: "Al-Hamd Logistics", date: "10 Oct 2026", amount: "PKR 148,000", status: "In transit", state: "progress" },
  { ref: "FR-10451", route: "Karachi → Hyderabad", carrier: "Saeed Transport Co.", date: "09 Oct 2026", amount: "PKR 42,000", status: "Delivered", state: "success" },
  { ref: "FR-10418", route: "Lahore → Islamabad", carrier: "Northline Cargo", date: "07 Oct 2026", amount: "PKR 37,500", status: "Awaiting quote", state: "pending" }
];

export const recentActivities = [
  { title: "Carrier accepted your shipment", detail: "FR-10482 · Al-Hamd Logistics", time: "Today, 10:15 AM", icon: "check" },
  { title: "Payment confirmed", detail: "Booking payment recorded for FR-10482", time: "Today, 9:42 AM", icon: "wallet" },
  { title: "New quote received", detail: "3 providers sent an offer for FR-10451", time: "Yesterday, 4:10 PM", icon: "quote" }
];

export const formatPKR = (amount) => `PKR ${Number(amount).toLocaleString("en-PK")}`;
