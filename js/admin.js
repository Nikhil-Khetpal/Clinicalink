// Clinicalink Admin Dashboard - JavaScript

// Admin Dashboard Controller
class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.data = {
            doctors: [],
            patients: [],
            appointments: [],
            activity: []
        };
        this.charts = {};
        
        this.init();
    }
    
    init() {
        console.log('🎮 Admin Dashboard Initialized');
        this.loadInitialData();
        this.setupEventListeners();
        this.initializeCharts();
        this.startAutoRefresh();
    }
    
    // Load initial data
    async loadInitialData() {
        this.showLoading();
        
        try {
            // In a real application, these would be API calls
            await this.loadMockData();
            this.updateDashboardStats();
            this.loadRecentActivity();
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showMessage('Error loading dashboard data', 'error');
        } finally {
            this.hideLoading();
        }
    }
    
    // Load mock data (replace with real API calls)
    async loadMockData() {
        this.data = {
            doctors: [
                { id: 1, name: 'Dr. John Smith', email: 'john@clinicalink.com', specialization: 'Cardiology', experience: 10, status: 'active', rating: 4.8, consultations: 156 },
                { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah@clinicalink.com', specialization: 'Pediatrics', experience: 8, status: 'active', rating: 4.9, consultations: 203 },
                { id: 3, name: 'Dr. Michael Brown', email: 'michael@clinicalink.com', specialization: 'Neurology', experience: 15, status: 'pending', rating: 4.7, consultations: 189 },
                { id: 4, name: 'Dr. Emily Davis', email: 'emily@clinicalink.com', specialization: 'Dermatology', experience: 6, status: 'active', rating: 4.6, consultations: 98 },
                { id: 5, name: 'Dr. Robert Wilson', email: 'robert@clinicalink.com', specialization: 'Orthopedics', experience: 12, status: 'inactive', rating: 4.5, consultations: 167 },
                { id: 6, name: 'Dr. Lisa Anderson', email: 'lisa@clinicalink.com', specialization: 'General Medicine', experience: 9, status: 'active', rating: 4.8, consultations: 234 },
                { id: 7, name: 'Dr. James Taylor', email: 'james@clinicalink.com', specialization: 'Psychiatry', experience: 11, status: 'active', rating: 4.7, consultations: 145 },
                { id: 8, name: 'Dr. Maria Garcia', email: 'maria@clinicalink.com', specialization: 'Gynecology', experience: 7, status: 'pending', rating: 4.9, consultations: 178 }
            ],
            patients: [
                { id: 1, name: 'Alice Johnson', email: 'alice@email.com', phone: '123-456-7890', age: 28, gender: 'female', healthScore: 95, registrationDate: '2024-01-15', lastVisit: '2024-03-20' },
                { id: 2, name: 'Bob Smith', email: 'bob@email.com', phone: '234-567-8901', age: 35, gender: 'male', healthScore: 88, registrationDate: '2024-02-10', lastVisit: '2024-03-18' },
                { id: 3, name: 'Carol Williams', email: 'carol@email.com', phone: '345-678-9012', age: 42, gender: 'female', healthScore: 92, registrationDate: '2024-01-20', lastVisit: '2024-03-22' },
                { id: 4, name: 'David Brown', email: 'david@email.com', phone: '456-789-0123', age: 31, gender: 'male', healthScore: 85, registrationDate: '2024-03-01', lastVisit: '2024-03-21' },
                { id: 5, name: 'Eva Martinez', email: 'eva@email.com', phone: '567-890-1234', age: 29, gender: 'female', healthScore: 90, registrationDate: '2024-02-15', lastVisit: '2024-03-19' },
                { id: 6, name: 'Frank Miller', email: 'frank@email.com', phone: '678-901-2345', age: 45, gender: 'male', healthScore: 78, registrationDate: '2024-01-10', lastVisit: '2024-03-15' },
                { id: 7, name: 'Grace Lee', email: 'grace@email.com', phone: '789-012-3456', age: 33, gender: 'female', healthScore: 94, registrationDate: '2024-02-20', lastVisit: '2024-03-23' },
                { id: 8, name: 'Henry Wilson', email: 'henry@email.com', phone: '890-123-4567', age: 38, gender: 'male', healthScore: 87, registrationDate: '2024-03-05', lastVisit: '2024-03-22' }
            ],
            appointments: [
                { id: 1, patient: 'Alice Johnson', doctor: 'Dr. John Smith', date: '2024-03-26 10:00', type: 'Online', status: 'scheduled', fee: 150 },
                { id: 2, patient: 'Bob Smith', doctor: 'Dr. Sarah Johnson', date: '2024-03-26 14:00', type: 'Offline', status: 'completed', fee: 200 },
                { id: 3, patient: 'Carol Williams', doctor: 'Dr. Michael Brown', date: '2024-03-27 09:00', type: 'Online', status: 'scheduled', fee: 180 },
                { id: 4, patient: 'David Brown', doctor: 'Dr. Emily Davis', date: '2024-03-25 16:00', type: 'Online', status: 'cancelled', fee: 120 },
                { id: 5, patient: 'Eva Martinez', doctor: 'Dr. Robert Wilson', date: '2024-03-27 11:00', type: 'Offline', status: 'scheduled', fee: 175 },
                { id: 6, patient: 'Frank Miller', doctor: 'Dr. Lisa Anderson', date: '2024-03-26 15:30', type: 'Online', status: 'completed', fee: 100 },
                { id: 7, patient: 'Grace Lee', doctor: 'Dr. James Taylor', date: '2024-03-28 13:00', type: 'Online', status: 'scheduled', fee: 160 },
                { id: 8, patient: 'Henry Wilson', doctor: 'Dr. Maria Garcia', date: '2024-03-25 10:30', type: 'Offline', status: 'completed', fee: 190 }
            ],
            activity: [
                { user: 'Alice Johnson', action: 'Booked appointment with Dr. John Smith', status: 'success', time: '2 minutes ago', type: 'appointment' },
                { user: 'Dr. John Smith', action: 'Updated profile information', status: 'success', time: '5 minutes ago', type: 'profile' },
                { user: 'Bob Smith', action: 'Completed consultation', status: 'success', time: '10 minutes ago', type: 'consultation' },
                { user: 'System', action: 'Database backup completed', status: 'success', time: '1 hour ago', type: 'system' },
                { user: 'Carol Williams', action: 'Registered new account', status: 'success', time: '2 hours ago', type: 'registration' },
                { user: 'Dr. Sarah Johnson', action: 'Approved new patient', status: 'success', time: '3 hours ago', type: 'approval' },
                { user: 'David Brown', action: 'Cancelled appointment', status: 'warning', time: '4 hours ago', type: 'appointment' },
                { user: 'Admin', action: 'Updated system settings', status: 'success', time: '5 hours ago', type: 'system' }
            ]
        };
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        this.setupSearchListeners();
        
        // Filter functionality
        this.setupFilterListeners();
        
        // Export functionality
        this.setupExportListeners();
        
        // Clear data functionality
        this.setupClearListeners();
    }
    
    // Setup search listeners
    setupSearchListeners() {
        const doctorSearch = document.getElementById('doctorSearch');
        const patientSearch = document.getElementById('patientSearch');
        const appointmentSearch = document.getElementById('appointmentSearch');
        
        if (doctorSearch) {
            doctorSearch.addEventListener('input', (e) => {
                this.filterTable('doctors', e.target.value);
            });
        }
        
        if (patientSearch) {
            patientSearch.addEventListener('input', (e) => {
                this.filterTable('patients', e.target.value);
            });
        }
        
        if (appointmentSearch) {
            appointmentSearch.addEventListener('input', (e) => {
                this.filterTable('appointments', e.target.value);
            });
        }
    }
    
    // Setup filter listeners
    setupFilterListeners() {
        const doctorFilter = document.getElementById('doctorFilter');
        const patientFilter = document.getElementById('patientFilter');
        const appointmentFilter = document.getElementById('appointmentFilter');
        
        if (doctorFilter) {
            doctorFilter.addEventListener('change', (e) => {
                this.filterByStatus('doctors', e.target.value);
            });
        }
        
        if (patientFilter) {
            patientFilter.addEventListener('change', (e) => {
                this.filterByGender('patients', e.target.value);
            });
        }
        
        if (appointmentFilter) {
            appointmentFilter.addEventListener('change', (e) => {
                this.filterByStatus('appointments', e.target.value);
            });
        }
    }
    
    // Setup export listeners
    setupExportListeners() {
        // These will be called from the HTML onclick handlers
        window.exportDoctors = () => this.exportData('doctors', 'doctors.csv');
        window.exportPatients = () => this.exportData('patients', 'patients.csv');
        window.exportAppointments = () => this.exportData('appointments', 'appointments.csv');
    }
    
    // Setup clear listeners
    setupClearListeners() {
        // These will be called from the HTML onclick handlers
        window.clearDoctors = () => this.clearData('doctors');
        window.clearPatients = () => this.clearData('patients');
        window.clearAppointments = () => this.clearData('appointments');
    }
    
    // Update dashboard statistics
    updateDashboardStats() {
        const totalUsers = this.data.doctors.length + this.data.patients.length;
        const totalDoctors = this.data.doctors.length;
        const totalPatients = this.data.patients.length;
        const totalAppointments = this.data.appointments.length;
        
        // Update stat cards with animation
        this.animateNumber('totalUsers', totalUsers);
        this.animateNumber('totalDoctors', totalDoctors);
        this.animateNumber('totalPatients', totalPatients);
        this.animateNumber('totalAppointments', totalAppointments);
    }
    
    // Animate number counting
    animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 2000;
        const start = 0;
        const increment = targetValue / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Load recent activity
    loadRecentActivity() {
        const tbody = document.getElementById('recentActivity');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.activity.slice(0, 10).forEach(activity => {
            const row = this.createActivityRow(activity);
            tbody.appendChild(row);
        });
    }
    
    // Create activity row
    createActivityRow(activity) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-2">${activity.user.charAt(0)}</div>
                    <div>
                        <div class="fw-bold">${activity.user}</div>
                        <small class="text-muted">${this.getActionTypeLabel(activity.type)}</small>
                    </div>
                </div>
            </td>
            <td>${activity.action}</td>
            <td><span class="status-badge status-${activity.status}">${activity.status}</span></td>
            <td><small>${activity.time}</small></td>
        `;
        return row;
    }
    
    // Get action type label
    getActionTypeLabel(type) {
        const labels = {
            'appointment': 'Appointment',
            'profile': 'Profile',
            'consultation': 'Consultation',
            'system': 'System',
            'registration': 'Registration',
            'approval': 'Approval'
        };
        return labels[type] || type;
    }
    
    // Initialize charts
    initializeCharts() {
        this.createUserGrowthChart();
        this.createAppointmentStatusChart();
        this.createSpecializationChart();
    }
    
    // Create user growth chart
    createUserGrowthChart() {
        const canvas = document.getElementById('userGrowthChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        this.charts.userGrowth = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Patients',
                        data: [120, 190, 300, 500, 800, 1200],
                        borderColor: '#00ff88',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Doctors',
                        data: [20, 35, 50, 80, 120, 180],
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
    
    // Create appointment status chart
    createAppointmentStatusChart() {
        const canvas = document.getElementById('appointmentChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Calculate appointment status counts
        const statusCounts = this.data.appointments.reduce((acc, apt) => {
            acc[apt.status] = (acc[apt.status] || 0) + 1;
            return acc;
        }, {});
        
        this.charts.appointmentStatus = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#00ff88', '#00d4ff', '#ff6b6b', '#ffc107'],
                    borderColor: ['#00ff88', '#00d4ff', '#ff6b6b', '#ffc107'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                }
            }
        });
    }
    
    // Create specialization chart
    createSpecializationChart() {
        const canvas = document.getElementById('specializationChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Calculate specialization counts
        const specCounts = this.data.doctors.reduce((acc, doctor) => {
            acc[doctor.specialization] = (acc[doctor.specialization] || 0) + 1;
            return acc;
        }, {});
        
        this.charts.specialization = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(specCounts),
                datasets: [{
                    label: 'Doctors by Specialization',
                    data: Object.values(specCounts),
                    backgroundColor: 'rgba(0, 255, 136, 0.6)',
                    borderColor: '#00ff88',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
    
    // Show section
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Update sidebar
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        this.currentSection = sectionName;
        
        // Load section-specific data
        this.loadSectionData(sectionName);
    }
    
    // Load section-specific data
    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'doctors':
                this.loadDoctorsTable();
                break;
            case 'patients':
                this.loadPatientsTable();
                break;
            case 'appointments':
                this.loadAppointmentsTable();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }
    
    // Load doctors table
    loadDoctorsTable() {
        const tbody = document.getElementById('doctorsTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.doctors.forEach(doctor => {
            const row = this.createDoctorRow(doctor);
            tbody.appendChild(row);
        });
    }
    
    // Create doctor row
    createDoctorRow(doctor) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-2">${doctor.name.charAt(0)}</div>
                    <div>
                        <div class="fw-bold">${doctor.name}</div>
                        <small class="text-muted">${doctor.email}</small>
                    </div>
                </div>
            </td>
            <td>${doctor.specialization}</td>
            <td>${doctor.experience} years</td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="me-2">⭐ ${doctor.rating}</span>
                    <small class="text-muted">(${doctor.consultations})</small>
                </div>
            </td>
            <td><span class="status-badge status-${doctor.status}">${doctor.status}</span></td>
            <td>
                <button class="action-btn" onclick="adminDashboard.editDoctor(${doctor.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="adminDashboard.deleteDoctor(${doctor.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }
    
    // Load patients table
    loadPatientsTable() {
        const tbody = document.getElementById('patientsTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.patients.forEach(patient => {
            const row = this.createPatientRow(patient);
            tbody.appendChild(row);
        });
    }
    
    // Create patient row
    createPatientRow(patient) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-2">${patient.name.charAt(0)}</div>
                    <div>
                        <div class="fw-bold">${patient.name}</div>
                        <small class="text-muted">${patient.email}</small>
                    </div>
                </div>
            </td>
            <td>${patient.phone}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress me-2" style="width: 50px; height: 8px;">
                        <div class="progress-bar bg-success" style="width: ${patient.healthScore}%"></div>
                    </div>
                    <span>${patient.healthScore}%</span>
                </div>
            </td>
            <td>
                <button class="action-btn" onclick="adminDashboard.editPatient(${patient.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="adminDashboard.deletePatient(${patient.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }
    
    // Load appointments table
    loadAppointmentsTable() {
        const tbody = document.getElementById('appointmentsTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        this.data.appointments.forEach(appointment => {
            const row = this.createAppointmentRow(appointment);
            tbody.appendChild(row);
        });
    }
    
    // Create appointment row
    createAppointmentRow(appointment) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-2">${appointment.patient.charAt(0)}</div>
                    <div>${appointment.patient}</div>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar me-2">${appointment.doctor.charAt(0)}</div>
                    <div>${appointment.doctor}</div>
                </div>
            </td>
            <td>
                <div>${appointment.date}</div>
                <small class="text-muted">${appointment.type}</small>
            </td>
            <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
            <td>$${appointment.fee}</td>
            <td>
                <button class="action-btn" onclick="adminDashboard.editAppointment(${appointment.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="adminDashboard.deleteAppointment(${appointment.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        return row;
    }
    
    // Filter table
    filterTable(tableName, searchTerm) {
        const tbody = document.getElementById(tableName + 'Table');
        if (!tbody) return;
        
        const rows = tbody.getElementsByTagName('tr');
        const term = searchTerm.toLowerCase();
        
        Array.from(rows).forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }
    
    // Filter by status
    filterByStatus(tableName, status) {
        const tbody = document.getElementById(tableName + 'Table');
        if (!tbody) return;
        
        const rows = tbody.getElementsByTagName('tr');
        
        Array.from(rows).forEach(row => {
            if (!status) {
                row.style.display = '';
            } else {
                const statusBadge = row.querySelector('.status-badge');
                const rowStatus = statusBadge ? statusBadge.textContent.toLowerCase() : '';
                row.style.display = rowStatus === status.toLowerCase() ? '' : 'none';
            }
        });
    }
    
    // Filter by gender
    filterByGender(tableName, gender) {
        const tbody = document.getElementById(tableName + 'Table');
        if (!tbody) return;
        
        const rows = tbody.getElementsByTagName('tr');
        
        Array.from(rows).forEach(row => {
            if (!gender) {
                row.style.display = '';
            } else {
                const cells = row.getElementsByTagName('td');
                const genderCell = cells[4]; // Gender is in 5th column (index 4)
                const rowGender = genderCell ? genderCell.textContent.toLowerCase() : '';
                row.style.display = rowGender === gender.toLowerCase() ? '' : 'none';
            }
        });
    }
    
    // Export data
    exportData(dataType, filename) {
        const data = this.data[dataType];
        if (!data || data.length === 0) {
            this.showMessage('No data to export', 'warning');
            return;
        }
        
        // Convert to CSV
        const csv = this.convertToCSV(data);
        
        // Download file
        this.downloadFile(csv, filename, 'text/csv');
        
        this.showMessage(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} data exported successfully`, 'success');
    }
    
    // Convert to CSV
    convertToCSV(data) {
        if (!data || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvHeaders = headers.join(',');
        
        const csvRows = data.map(row => {
            return headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') 
                    ? `"${value}"` 
                    : value;
            }).join(',');
        });
        
        return [csvHeaders, ...csvRows].join('\n');
    }
    
    // Download file
    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    // Clear data
    clearData(dataType) {
        const confirmMessage = `Are you sure you want to clear all ${dataType}? This action cannot be undone.`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Clear data
        this.data[dataType] = [];
        
        // Refresh table
        this.loadSectionData(this.currentSection);
        
        // Update dashboard stats
        this.updateDashboardStats();
        
        // Update charts
        this.updateCharts();
        
        this.showMessage(`All ${dataType} have been cleared`, 'success');
    }
    
    // Update charts
    updateCharts() {
        // Update appointment status chart
        if (this.charts.appointmentStatus) {
            const statusCounts = this.data.appointments.reduce((acc, apt) => {
                acc[apt.status] = (acc[apt.status] || 0) + 1;
                return acc;
            }, {});
            
            this.charts.appointmentStatus.data.labels = Object.keys(statusCounts);
            this.charts.appointmentStatus.data.datasets[0].data = Object.values(statusCounts);
            this.charts.appointmentStatus.update();
        }
    }
    
    // Edit functions (placeholders)
    editDoctor(id) {
        const doctor = this.data.doctors.find(d => d.id === id);
        if (doctor) {
            this.showMessage(`Edit Doctor: ${doctor.name} - Functionality would be implemented here`, 'info');
        }
    }
    
    editPatient(id) {
        const patient = this.data.patients.find(p => p.id === id);
        if (patient) {
            this.showMessage(`Edit Patient: ${patient.name} - Functionality would be implemented here`, 'info');
        }
    }
    
    editAppointment(id) {
        const appointment = this.data.appointments.find(a => a.id === id);
        if (appointment) {
            this.showMessage(`Edit Appointment: ${appointment.patient} with ${appointment.doctor} - Functionality would be implemented here`, 'info');
        }
    }
    
    // Delete functions
    deleteDoctor(id) {
        if (!confirm('Are you sure you want to delete this doctor?')) {
            return;
        }
        
        this.data.doctors = this.data.doctors.filter(d => d.id !== id);
        this.loadDoctorsTable();
        this.updateDashboardStats();
        this.showMessage('Doctor deleted successfully', 'success');
    }
    
    deletePatient(id) {
        if (!confirm('Are you sure you want to delete this patient?')) {
            return;
        }
        
        this.data.patients = this.data.patients.filter(p => p.id !== id);
        this.loadPatientsTable();
        this.updateDashboardStats();
        this.showMessage('Patient deleted successfully', 'success');
    }
    
    deleteAppointment(id) {
        if (!confirm('Are you sure you want to delete this appointment?')) {
            return;
        }
        
        this.data.appointments = this.data.appointments.filter(a => a.id !== id);
        this.loadAppointmentsTable();
        this.updateDashboardStats();
        this.updateCharts();
        this.showMessage('Appointment deleted successfully', 'success');
    }
    
    // Load analytics
    loadAnalytics() {
        // This would load more detailed analytics
        this.showMessage('Analytics section would show detailed reports and insights', 'info');
    }
    
    // Show loading
    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    // Hide loading
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    // Show message
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup ${type}`;
        messageDiv.textContent = message;
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Show message
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
    
    // Start auto refresh
    startAutoRefresh() {
        // Refresh dashboard data every 30 seconds
        setInterval(() => {
            if (this.currentSection === 'dashboard') {
                this.loadRecentActivity();
            }
        }, 30000);
    }
}

// Global functions for HTML onclick handlers
window.showSection = (sectionName) => {
    if (window.adminDashboard) {
        window.adminDashboard.showSection(sectionName);
    }
};

window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
};

window.refreshActivity = () => {
    if (window.adminDashboard) {
        window.adminDashboard.loadRecentActivity();
        window.adminDashboard.showMessage('Activity refreshed!', 'success');
    }
};

window.addDoctor = () => {
    if (window.adminDashboard) {
        window.adminDashboard.showMessage('Add Doctor functionality would be implemented here', 'info');
    }
};

window.addPatient = () => {
    if (window.adminDashboard) {
        window.adminDashboard.showMessage('Add Patient functionality would be implemented here', 'info');
    }
};

window.addAppointment = () => {
    if (window.adminDashboard) {
        window.adminDashboard.showMessage('Add Appointment functionality would be implemented here', 'info');
    }
};

window.logout = () => {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
};

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
});

console.log('🎮 Admin Dashboard JavaScript Loaded');
