import db from '../config/db.js';

// --- CLIENTS ---
export const getClients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createClient = async (req, res) => {
    const { id, name, company, phone, email, address, city } = req.body;
    try {
        await db.query(
            'INSERT INTO clients (id, name, company, phone, email, address, city) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, name, company, phone, email, address, city]
        );
        res.json({ message: 'Client created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, company, phone, email, address, city } = req.body;
    try {
        await db.query(
            'UPDATE clients SET name=?, company=?, phone=?, email=?, address=?, city=? WHERE id=?',
            [name, company, phone, email, address, city, id]
        );
        res.json({ message: 'Client updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM clients WHERE id=?', [id]);
        res.json({ message: 'Client deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- ORDERS ---
export const getOrders = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        const orders = rows.map(r => ({
            id: r.id,
            orderNumber: r.order_number,
            clientId: r.client_id,
            orderDate: r.order_date,
            deliveryDate: r.delivery_date,
            serviceType: r.service_type,
            workDescription: r.work_description,
            documentType: r.document_type,
            documentNumber: r.document_number,
            price: r.price,
            advance: r.advance,
            isPrepaid: r.is_prepaid,
            totalPaid: r.total_paid,
            status: r.status,
            comments: r.comments,
            discount: r.discount,
            taxRate: r.tax_rate,
            validUntil: r.valid_until,
            priority: r.priority,
            createdAt: r.created_at
        }));
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createOrder = async (req, res) => {
    const o = req.body;
    try {
        await db.query(
            `INSERT INTO orders (
                order_number, client_id, order_date, delivery_date, service_type, 
                work_description, document_type, document_number, price, advance, 
                is_prepaid, total_paid, status, comments, discount, tax_rate, 
                valid_until, priority
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                o.orderNumber, o.clientId, o.orderDate, o.deliveryDate, o.serviceType,
                o.workDescription, o.documentType, o.documentNumber, o.price, o.advance,
                o.isPrepaid, o.totalPaid, o.status, o.comments, o.discount, o.taxRate,
                o.validUntil, o.priority
            ]
        );
        res.json({ message: 'Order created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const o = req.body;
    try {
        await db.query(
            `UPDATE orders SET 
                client_id=?, order_date=?, delivery_date=?, service_type=?, 
                work_description=?, document_type=?, document_number=?, price=?, advance=?, 
                is_prepaid=?, total_paid=?, status=?, comments=?, discount=?, tax_rate=?, 
                valid_until=?, priority=?
             WHERE id=?`,
            [
                o.clientId, o.orderDate, o.deliveryDate, o.serviceType,
                o.workDescription, o.documentType, o.documentNumber, o.price, o.advance,
                o.isPrepaid, o.totalPaid, o.status, o.comments, o.discount, o.taxRate,
                o.validUntil, o.priority, id
            ]
        );
        res.json({ message: 'Order updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM orders WHERE id=?', [id]);
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- APPOINTMENTS ---
export const getAppointments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM appointments ORDER BY appointment_date ASC');
        const appointments = rows.map(r => ({
            id: r.id,
            clientId: r.client_id,
            date: r.appointment_date,
            time: r.appointment_time,
            serviceType: r.service_type,
            notes: r.notes,
            status: r.status,
            reminderSent: r.reminder_sent
        }));
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createAppointment = async (req, res) => {
    const a = req.body;
    try {
        await db.query(
            `INSERT INTO appointments (client_id, appointment_date, appointment_time, service_type, notes, status, reminder_sent)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [a.clientId, a.date, a.time, a.serviceType, a.notes, a.status, a.reminderSent]
        );
        res.json({ message: 'Appointment created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const a = req.body;
    try {
        await db.query(
            `UPDATE appointments SET client_id=?, appointment_date=?, appointment_time=?, service_type=?, notes=?, status=?, reminder_sent=? WHERE id=?`,
            [a.clientId, a.date, a.time, a.serviceType, a.notes, a.status, a.reminderSent, id]
        );
        res.json({ message: 'Appointment updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM appointments WHERE id=?', [id]);
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
