"use client";
import React, { createContext, useContext } from 'react';

// 1. Definisikan kerangka data sesi
interface AdminContextType {
  name: string;
  role: string;
}

// 2. Buat Context
const AdminContext = createContext<AdminContextType>({ name: '', role: '' });

// 3. Custom Hook
export const useAdmin = () => useContext(AdminContext);

// 4. Komponen Wrapper Utama
export default function AdminProvider({ 
  children, 
  name, 
  role 
}: { 
  children: React.ReactNode; 
  name: string; 
  role: string; 
}) {
  return (
    <AdminContext.Provider value={{ name, role }}>
      {children}
    </AdminContext.Provider>
  );
}