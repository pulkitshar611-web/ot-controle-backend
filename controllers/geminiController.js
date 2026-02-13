import { GoogleGenAI } from "@google/genai";
import db from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 1. Get Business Insight
export const getBusinessInsight = async (req, res) => {
    const { orders, clients } = req.body;

    try {
        const summary = {
            totalOrders: orders.length,
            totalClients: clients.length,
            revenue: orders.reduce((acc, curr) => acc + (curr.price || 0), 0),
            pendingOrders: orders.filter(o => o.status === 'Pendiente').length
        };

        const prompt = `
          Actúa como un analista de negocios experto.
          Analiza el siguiente resumen de nuestro negocio: ${JSON.stringify(summary)}
          Proporciona un insight estratégico corto (máximo 3 frases) en ESPAÑOL.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const resultText = response.text || "Análisis no disponible.";

        // Log to DB
        await db.execute(
            'INSERT INTO ai_logs (function_name, prompt_text, response_text, status) VALUES (?, ?, ?, ?)',
            ['getBusinessInsight', prompt, resultText, 'Success']
        );

        res.json({ result: resultText });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "AI Service Unavailable" });
    }
};

// 2. Suggest Service Description
export const suggestServiceDescription = async (req, res) => {
    const { serviceType } = req.body;

    try {
        const prompt = `Genera especificaciones técnicas rápidas (máximo 15 palabras) en español para copistería tipo: "${serviceType}". 
        Ejemplo: "Papel estucado 300g, Full Color". Solo texto.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const resultText = response.text?.trim() || "";

        await db.execute(
            'INSERT INTO ai_logs (function_name, prompt_text, response_text, status) VALUES (?, ?, ?, ?)',
            ['suggestServiceDescription', prompt, resultText, 'Success']
        );

        res.json({ result: resultText });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Generate Welcome Message
export const getGreeting = async (req, res) => {
    try {
        const prompt = `Genera un mensaje de bienvenida corto, profesional y motivador (máximo 1 frase) para un sistema de gestión de órdenes de trabajo (OT-Control). En Español.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });

        const resultText = response.text?.trim() || "Bienvenido a OT-Control";
        res.json({ result: resultText });

    } catch (error) {
        console.error("AI Greeting Error:", error);
        res.json({ result: "Bienvenido al Sistema de Gestión" });
    }
};
