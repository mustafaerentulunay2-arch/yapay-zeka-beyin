"use client";

import React, { useState } from 'react';

export default function AnalizPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);

  const analizEt = () => {
    if (!metin) return alert("Lütfen bir metin girin!");
    setSonuc(Math.random() > 0.5 ? 'Olumlu' : 'Olumsuz');
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Yapay Zeka Analiz Paneli</h1>
      <textarea 
        value={metin} 
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Analiz edilecek metni yazın..."
        style={{ width: '100%', height: '150px', padding: '10px', color: 'black', borderRadius: '8px' }}
      />
      <button 
        onClick={analizEt}
        style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Analiz Et
      </button>
      {sonuc && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid white', borderRadius: '8px' }}>
          Sonuç: {sonuc}
        </div>
      )}
    </div>
  );
}
