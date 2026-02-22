"use client";
import { useState } from 'react';

export default function AnalizPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const analizEt = async () => {
    if(!metin) return alert("Lütfen bir metin girin!");
    setYukleniyor(true);
    try {
      // Bu kısım 8000 portunda çalışan Python (Beyin) ile konuşur
      const response = await fetch('https://yapay-zeka-beyin-2.onrender.com/tahmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: metin }),
      });
      const data = await response.json();
      setSonuc(data.sonuc);
    } catch (error) {
      alert("Hata: Python sunucusu (8000 portu) açık mı? Terminali kontrol et!");
    }
    setYukleniyor(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400 mb-2 text-center">Yapay Zeka Duygu Analizi</h1>
        <p className="text-slate-400 text-center mb-8">Metninizi yazın, analiz edelim.</p>
        
        <textarea 
          className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl mb-6 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          rows={5}
          placeholder="Analiz edilecek yorumu buraya yazın..."
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
        />
        
        <button 
          onClick={analizEt}
          disabled={yukleniyor}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all"
        >
          {yukleniyor ? 'Analiz Ediliyor...' : 'Analiz Et'}
        </button>

        {sonuc && (
          <div className={`mt-8 p-6 rounded-xl text-center font-black text-2xl border ${sonuc === 'Olumlu' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
            Sonuç: {sonuc}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';

export default function AnalizPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  const analizEt = async () => {
    if(!metin) return alert("Lütfen bir metin girin!");
    setYukleniyor(true);
    try {
      // Bu kısım 8000 portunda çalışan Python (Beyin) ile konuşur
      const response = await fetch('https://yapay-zeka-beyin-2.onrender.com/tahmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: metin }),
      });
      const data = await response.json();
      setSonuc(data.sonuc);
    } catch (error) {
      alert("Hata: Python sunucusu (8000 portu) açık mı? Terminali kontrol et!");
    }
    setYukleniyor(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400 mb-2 text-center">Yapay Zeka Duygu Analizi</h1>
        <p className="text-slate-400 text-center mb-8">Metninizi yazın, analiz edelim.</p>
        
        <textarea 
          className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl mb-6 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          rows={5}
          placeholder="Analiz edilecek yorumu buraya yazın..."
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
        />
        
        <button 
          onClick={analizEt}
          disabled={yukleniyor}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all"
        >
          {yukleniyor ? 'Analiz Ediliyor...' : 'Analiz Et'}
        </button>

        {sonuc && (
          <div className={`mt-8 p-6 rounded-xl text-center font-black text-2xl border ${sonuc === 'Olumlu' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
            Sonuç: {sonuc}
          </div>
        )}
      </div>
    </div>
  );
}
