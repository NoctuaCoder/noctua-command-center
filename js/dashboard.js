document.addEventListener('DOMContentLoaded', () => {
    initDate();
    initRevenueChart();
    initOrderTable();
});

function initDate() {
    const dateEl = document.getElementById('currentDate');
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    dateEl.textContent = `Today, ${now.toLocaleDateString('en-US', options)}`;
}

function initRevenueChart() {
    const chartContainer = document.getElementById('revenueChart');
    const data = [40, 65, 45, 80, 55, 90, 70, 85]; // Fake data
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

    data.forEach((value, index) => {
        const col = document.createElement('div');
        col.className = 'bar-col';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = '0%'; // Start at 0 for animation

        // Highlight the highest bar or specific ones
        if (value > 80) bar.classList.add('active');

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = labels[index];

        col.appendChild(bar);
        col.appendChild(label);
        chartContainer.appendChild(col);

        // Animate height
        setTimeout(() => {
            bar.style.height = `${value}%`;
        }, 100 + (index * 100));
    });
}

function initOrderTable() {
    const tableBody = document.getElementById('orderTableBody');
    const orders = [
        { id: '#876364', customer: 'Alana Doe', category: 'Electronics', price: '$1,200.00', date: '22 Nov 2025', status: 'on-way' },
        { id: '#876365', customer: 'John Smith', category: 'Fashion', price: '$150.00', date: '21 Nov 2025', status: 'delivered' },
        { id: '#876366', customer: 'Sarah Lee', category: 'Home', price: '$450.00', date: '21 Nov 2025', status: 'await' },
        { id: '#876367', customer: 'Mike Ross', category: 'Electronics', price: '$2,300.00', date: '20 Nov 2025', status: 'delivered' },
        { id: '#876368', customer: 'Rachel Green', category: 'Fashion', price: '$85.00', date: '20 Nov 2025', status: 'on-way' },
    ];

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div class="user-avatar" style="width: 24px; height: 24px; font-size: 0.7rem;"></div>
                    ${order.customer}
                </div>
            </td>
            <td>${order.category}</td>
            <td>${order.price}</td>
            <td>${order.date}</td>
            <td><span class="status-pill ${order.status}">${order.status.replace('-', ' ')}</span></td>
            <td>
                <button style="background: none; border: none; color: var(--text-secondary); cursor: pointer;">•••</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
