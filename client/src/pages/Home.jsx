import React from "react";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome to PawPulse 🐾</h1>
        <p className="mt-4 text-gray-700">Browse products, book appointments, and manage pet records.</p>
      </main>
    </div>
  );
}

export default Home;
