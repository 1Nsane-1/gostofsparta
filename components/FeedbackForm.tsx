import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mvgebago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        // Show success animation
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
        
        // Reset sent status after a delay to allow another message
        setTimeout(() => setSent(false), 5000);
      } else {
        console.error("Failed to send message via Formspree");
        alert("Ворон сбился с пути. Попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ворон сбился с пути. Проверьте соединение.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 border-2 border-stone-800 bg-stone-900/50 backdrop-blur-sm relative group">
      <div className="absolute top-0 left-0 w-2 h-2 bg-stone-500 group-hover:bg-spartan-red transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-stone-500 group-hover:bg-spartan-red transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-stone-500 group-hover:bg-spartan-red transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-stone-500 group-hover:bg-spartan-red transition-colors"></div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-stone-200 tracking-widest uppercase">
            ОБРАТНАЯ СВЯЗЬ
        </h3>
        <p className="text-stone-500 text-sm mt-2 font-serif">ОТПРАВЬ ВОРОНА</p>
      </div>

      {sent ? (
        <div className="py-12 text-center animate-pulse border border-green-900 bg-green-900/20">
          <p className="text-xl text-green-500 font-serif">ВОРОН ОТПРАВЛЕН.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-serif text-stone-400 uppercase tracking-wider mb-2">
              Твое имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 p-4 text-stone-200 focus:outline-none focus:border-spartan-red transition-colors font-sans"
              placeholder="Смертный"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-serif text-stone-400 uppercase tracking-wider mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 p-4 text-stone-200 focus:outline-none focus:border-spartan-red transition-colors font-sans"
              placeholder="raven@midgard.com"
              required
              disabled={submitting}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-xs font-serif text-stone-400 uppercase tracking-wider mb-2">
              Послание
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-stone-950 border border-stone-700 p-4 text-stone-200 focus:outline-none focus:border-spartan-red transition-colors font-sans"
              placeholder="Говори ясно..."
              required
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-stone-800 hover:bg-spartan-red text-stone-300 hover:text-white font-serif py-4 uppercase tracking-[0.2em] border border-stone-700 hover:border-red-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;