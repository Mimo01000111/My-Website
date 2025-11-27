        // Enhanced Barangay Data Structure - NOW INCLUDES NEWS
        const barangayData = {
            systemName: "BARANGAY 118 ONLINE SYSTEM",
            hero: {
                title: "Barangay 118 Online Management System",
                description: "Empowering our community through smart and efficient digital services."
            },
            welcomeSection: {
                backgroundImage: "8055825756095.png",
                title: "Welcome to Barangay 118",
                subtitle: "A Community of Unity and Progress",
                logo: "308673009_177778618128931_642779678020875763_n.png"
            },
            newsSection: {
                title: "Latest Stories",
                subtitle: "Stay updated with the latest news and announcements from Barangay 118"
            },
            news: [

{
    id: 1,
    title: "Japan builds new facility for Grace Park Health Center in Caloocan (2025)",
    excerpt: "The Embassy of Japan provided around PHP 6 million to construct the new Grace Park Health Center in Caloocan City.",
    content: "On March 10, 2025, Embassy of Japan Second Secretary MATSUSHIGE Tomoaki attended the turnover ceremony for the 'Project for the Construction of the Grace Park Health Center in Caloocan City.' Japan allocated USD 120,477 (≈ PHP 6 million) under the Official Development Assistance – Grant Assistance for Grass-roots Human Security Projects (GGP). This new facility replaces the old, flood-prone building to ensure safer, cleaner, and modern healthcare services for approximately 9,600 patients annually.",
    date: "March 10, 2025",
    image: "https://www.ph.emb-japan.go.jp/files/100808323.jpg",
    category: "Community",
    readTime: "5 min",
    isFeatured: false
},
{
    id: 2,
    title: "Caloocan Fire: 1 PWD dead, 50 families displaced",
    excerpt: "A person with disability died after a large fire broke out in Barangay 118, Grace Park, Caloocan in December 2024.",
    content: "According to Caloocan BFP, the fire started around 2:56 AM at 4th Avenue and quickly spread due to houses being built closely together. 'A PWD died in a fire which razed about 20 houses in Caloocan City…' GMA News reported.",
    date: "December 2024",
    image: "https://images.gmanews.tv/webpics/2024/12/caloocan_fire_12-29-24_2024_12_29_18_34_08.jpg",
    category: "Fire",
    readTime: "3 min",
    isFeatured: false
},
{
    id: 3,
    title: "New Barangay Health Center in Brgy. 118-120, Caloocan",
    excerpt: "SM Foundation turned over the newly improved Barangay Health Center of Grace Park (Brgy. 118-120) in Caloocan City days before 2024 arrived.",
    content: "SM Foundation and its partners led this renovation project to turn the facility into a more comfortable and efficient clinic. 'A few days before New Year's Day, SM Foundation turned over…' according to Market Monitor.",
    date: "January 16, 2024",
    image: "https://i0.wp.com/marketmonitor.com.ph/wp-content/uploads/2024/01/SMFI-image2.jpg?resize=618%2C927&ssl=1",
    category: "Health",
    readTime: "4 min",
    isFeatured: false
}

            ],
            events: [
                { day: "11", month: "Nov", title: "Barangay 118 General Assembly", description: "Monthly gathering for all residents to discuss community matters and updates.", time: "8:00 AM - 12:00 PM", location: "Barangay 118 Hall Covered Court" },
                { day: "15", month: "Nov", title: "Health and Wellness Seminar", description: "Free health check-ups and informative talks on community health.", time: "1:00 PM - 4:00 PM", location: "Barangay 118 Health Center" },
                { day: "24", month: "Nov", title: "Community Clean-up Drive", description: "Monthly community clean-up activity. All residents are welcome to join.", time: "6:00 AM - 9:00 AM", location: "Meet at Barangay 118 Plaza" }
            ],
            emergencyContacts: [
                { icon: "🚑", title: "Emergency Medical Services", description: "For medical emergencies and ambulance", number: "911" },
                { icon: "🚒", title: "Fire Department", description: "For fire emergencies and rescue", number: "(02) 8426-0219" },
                { icon: "👮", title: "Police Department", description: "For crime reporting and emergencies", number: "117" },
                { icon: "📞", title: "Barangay 118 Hotline", description: "For barangay-related concerns", number: "(02) 8123-4567" }
            ],
            footer: {
                title: "Barangay 118 Online System",
                description: "Digital and efficient services for Barangay 118.",
                contactInfo: [
                    "Barangay 118 Hall, City Proper",
                    "Metro Manila, Philippines",
                    "(02) 8123-4567",
                    "info@barangay118.gov.ph",
                    "Mon-Fri: 8:00 AM - 5:00 PM"
                ],
                socialMedia: {
                    facebook: "https://www.facebook.com",
                    email: "mailto:barangay118@gmail.com"
                },
                copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
            },
            sectionTitles: {
                news: "Latest Stories",
                events: "Barangay 118 Community Events Calendar",
                upcomingEvents: "Upcoming Events",
                emergency: "Barangay 118 Emergency Contacts"
            }
        };

        // Calendar state - SET TO NOVEMBER 2025
        let currentDate = new Date(2025, 10, 1); // November 2025 (month is 0-indexed)
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            loadData();
            setupEventListeners();
            generateCalendar(currentMonth, currentYear);
            setupNewsEventListeners();
            
            // Setup dynamic scrolling for news list
            setupNewsListScrolling();
            
            // Listen for storage changes (sync across tabs)
            window.addEventListener('storage', function(e) {
                if (e.key === 'barangayData') {
                    loadData();
                }
            });
        });

        // Load data from local storage or use default
        function loadData() {
            try {
                const savedData = localStorage.getItem('barangayData');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    
                    // Deep merge to preserve all data including missing items
                    Object.keys(parsedData).forEach(key => {
                        if (Array.isArray(parsedData[key])) {
                            barangayData[key] = parsedData[key];
                        } else if (typeof parsedData[key] === 'object' && parsedData[key] !== null) {
                            Object.assign(barangayData[key], parsedData[key]);
                        } else {
                            barangayData[key] = parsedData[key];
                        }
                    });
                    
                    console.log(' Data loaded from local storage');
                } else {
                    console.log(' Using default data');
                }
            } catch (error) {
                console.error(' Error loading data:', error);
            }
            
            // Update the UI with the data
            updateUI();
        }

        // Save data to local storage
        function saveData() {
            try {
                localStorage.setItem('barangayData', JSON.stringify(barangayData));
                console.log(' Data saved to local storage');
                return true;
            } catch (error) {
                console.error(' Error saving data:', error);
                return false;
            }
        }

        // Update the UI with current data
        function updateUI() {
            try {
                // System name
                if (document.getElementById('system-name')) {
                    document.getElementById('system-name').textContent = barangayData.systemName;
                }

                // Hero section
                if (document.getElementById('hero-title')) {
                    document.getElementById('hero-title').textContent = barangayData.hero.title;
                }
                if (document.getElementById('hero-description')) {
                    document.getElementById('hero-description').textContent = barangayData.hero.description;
                }

                // Welcome Section
                const welcomeBackground = document.getElementById('welcome-background');
                if (welcomeBackground && barangayData.welcomeSection.backgroundImage) {
                    welcomeBackground.style.backgroundImage = `url(${barangayData.welcomeSection.backgroundImage})`;
                }
                
                if (document.getElementById('welcome-title')) {
                    document.getElementById('welcome-title').textContent = barangayData.welcomeSection.title;
                }
                if (document.getElementById('welcome-subtitle')) {
                    document.getElementById('welcome-subtitle').textContent = barangayData.welcomeSection.subtitle;
                }
                
                const barangayLogo = document.getElementById('barangay-logo-img');
                if (barangayLogo && barangayData.welcomeSection.logo) {
                    barangayLogo.src = barangayData.welcomeSection.logo;
                }

                // News Section
                if (document.getElementById('news-section-title')) {
                    document.getElementById('news-section-title').textContent = barangayData.sectionTitles.news;
                }
                if (document.getElementById('news-section-subtitle')) {
                    document.getElementById('news-section-subtitle').textContent = barangayData.newsSection.subtitle;
                }
                renderNews();

                // Section titles
                if (document.getElementById('events-title')) {
                    document.getElementById('events-title').textContent = barangayData.sectionTitles.events;
                }
                if (document.getElementById('upcoming-events-title')) {
                    document.getElementById('upcoming-events-title').textContent = barangayData.sectionTitles.upcomingEvents;
                }
                if (document.getElementById('emergency-title')) {
                    document.getElementById('emergency-title').textContent = barangayData.sectionTitles.emergency;
                }

                // Events
                renderEvents();

                // Emergency Contacts
                renderEmergencyContacts();

                // Footer
                renderFooter();

                console.log(' UI updated successfully');
            } catch (error) {
                console.error(' Error updating UI:', error);
            }
        }

        // Render news section
        function renderNews() {
            const newsGrid = document.getElementById('news-grid-container');
            if (!newsGrid) return;

            newsGrid.innerHTML = '';

            // Ensure we have news data
            if (!barangayData.news || barangayData.news.length === 0) {
                newsGrid.innerHTML = '<div class="no-news">No news available</div>';
                return;
            }

            // Find featured news
            const featuredNews = barangayData.news.find(news => news.isFeatured) || barangayData.news[0];
            const regularNews = barangayData.news.filter(news => news.id !== featuredNews.id).slice(0, 3);

            // Featured News (Left Side - 55%)
            const featuredHtml = `
                <div class="featured-news">
                    <div class="featured-card">
                        <div class="featured-image-container">
                            <img src="${featuredNews.image}" alt="${featuredNews.title}" class="featured-image" onerror="this.src='https://via.placeholder.com/400x300?text=News+Image'">
                            <div class="featured-badge">${featuredNews.category}</div>
                        </div>
                        <div class="featured-content">
                            <div class="featured-date">
                                <i class="far fa-calendar"></i> ${featuredNews.date}
                            </div>
                            <h3 class="featured-title">${featuredNews.title}</h3>
                            <p class="featured-excerpt">${featuredNews.excerpt}</p>
                            <a href="#" class="featured-read-more" data-news-id="${featuredNews.id}"> Read More <i class="fas fa-arrow-right"></i> </a>
                        </div>
                    </div>
                </div>
            `;

            // News List (Right Side - 45%)
            let newsListHtml = `
                <div class="news-list">
                    <div class="news-list-header">
                        <h3 class="news-list-title">Mga Balita</h3>
                    </div>
                    <div class="news-list-items" id="news-list-items">
            `;

            regularNews.forEach(news => {
                newsListHtml += `
                    <div class="news-item" data-news-id="${news.id}">
                        <div class="news-item-image-container">
                            <img src="${news.image}" alt="${news.title}" class="news-item-image" onerror="this.src='https://via.placeholder.com/150x100?text=News'">
                            <div class="news-item-badge">${news.category}</div>
                        </div>
                        <div class="news-item-content">
                            <div class="news-item-date">
                                <i class="far fa-calendar"></i> ${news.date}
                            </div>
                            <h4 class="news-item-title">${news.title}</h4>
                            <p class="news-item-excerpt">${news.excerpt}</p>
                            <div class="news-item-meta">
                                <a href="#" class="news-item-read-more" data-news-id="${news.id}"> Read More <i class="fas fa-arrow-right"></i> </a>
                                <span class="news-item-read-time"><i class="far fa-clock"></i> ${news.readTime}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            newsListHtml += `
                    </div>
                </div>
            `;
            newsGrid.innerHTML = featuredHtml + newsListHtml;
            
            // Setup dynamic scrolling after news is rendered
            setTimeout(setupNewsListScrolling, 100);
        }

        // Setup dynamic scrolling for news list
        function setupNewsListScrolling() {
            const newsListItems = document.getElementById('news-list-items');
            if (!newsListItems) return;
            
            // Calculate max height based on 3 items
            const calculateMaxHeight = () => {
                if (newsListItems.children.length === 0) return;
                
                const firstItem = newsListItems.children[0];
                const itemHeight = firstItem.offsetHeight;
                const gap = 20; // Match the CSS gap
                
                // Set max height to show exactly 3 items
                const maxHeight = (itemHeight * 3) + (gap * 2);
                newsListItems.style.maxHeight = `${maxHeight}px`;
                
                // Ensure width doesn't exceed left column
                const featuredNews = document.querySelector('.featured-news');
                if (featuredNews) {
                    const featuredWidth = featuredNews.offsetWidth;
                    newsListItems.parentElement.style.maxWidth = `${featuredWidth}px`;
                }
            };
            
            // Calculate initially
            calculateMaxHeight();
            
            // Recalculate on window resize
            window.addEventListener('resize', calculateMaxHeight);
        }

        // Render events
        function renderEvents() {
            const eventsContainer = document.getElementById('events-container');
            if (!eventsContainer) return;

            eventsContainer.innerHTML = '';
            
            if (!barangayData.events || barangayData.events.length === 0) {
                eventsContainer.innerHTML = '<div class="no-events">No upcoming events</div>';
                return;
            }

            barangayData.events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.innerHTML = `
                    <div class="event-date">
                        <div class="day">${event.day}</div>
                        <div class="month">${event.month}</div>
                    </div>
                    <div class="event-details">
                        <h4 class="event-title">${event.title}</h4>
                        <p class="event-description">${event.description}</p>
                        <div class="event-time"><i class="far fa-clock"></i> ${event.time}</div>
                        <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                    </div>
                `;
                eventsContainer.appendChild(eventItem);
            });
        }

        // Render emergency contacts
        function renderEmergencyContacts() {
            const emergencyContainer = document.getElementById('emergency-contacts-container');
            if (!emergencyContainer) return;

            emergencyContainer.innerHTML = '';
            
            if (!barangayData.emergencyContacts || barangayData.emergencyContacts.length === 0) {
                emergencyContainer.innerHTML = '<div class="no-contacts">No emergency contacts available</div>';
                return;
            }

            barangayData.emergencyContacts.forEach(contact => {
                const contactCard = document.createElement('div');
                contactCard.className = 'emergency-card';
                contactCard.innerHTML = `
                    <div class="emergency-icon">${contact.icon}</div>
                    <h3>${contact.title}</h3>
                    <p>${contact.description}</p>
                    <div class="emergency-number">${contact.number}</div>
                `;
                emergencyContainer.appendChild(contactCard);
            });
        }

        // Render footer
        function renderFooter() {
            if (document.getElementById('footer-title')) {
                document.getElementById('footer-title').textContent = barangayData.footer.title;
            }
            if (document.getElementById('footer-description')) {
                document.getElementById('footer-description').textContent = barangayData.footer.description;
            }
            
            const facebookLink = document.getElementById('facebook-link');
            if (facebookLink && barangayData.footer.socialMedia) {
                facebookLink.href = barangayData.footer.socialMedia.facebook;
            }
            
            const emailLink = document.getElementById('email-link');
            if (emailLink && barangayData.footer.socialMedia) {
                emailLink.href = barangayData.footer.socialMedia.email;
            }
            
            if (document.getElementById('copyright-text')) {
                document.getElementById('copyright-text').innerHTML = barangayData.footer.copyright;
            }

            // Contact info
            const contactList = document.getElementById('footer-contact-info');
            if (contactList && barangayData.footer.contactInfo) {
                contactList.innerHTML = '';
                barangayData.footer.contactInfo.forEach(info => {
                    const listItem = document.createElement('li');
                    
                    if (info.includes('Barangay') || info.includes('Hall')) {
                        listItem.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${info}`;
                    } else if (info.includes('Metro Manila')) {
                        listItem.innerHTML = `<i class="fas fa-map-pin"></i> ${info}`;
                    } else if (info.includes('(') && info.includes(')')) {
                        listItem.innerHTML = `<i class="fas fa-phone"></i> ${info}`;
                    } else if (info.includes('@')) {
                        listItem.innerHTML = `<i class="fas fa-envelope"></i> ${info}`;
                    } else if (info.includes('AM') || info.includes('PM')) {
                        listItem.innerHTML = `<i class="fas fa-clock"></i> ${info}`;
                    } else {
                        listItem.innerHTML = `<i class="fas fa-info-circle"></i> ${info}`;
                    }
                    
                    contactList.appendChild(listItem);
                });
            }
        }

        // Generate calendar dynamically with date numbers
        function generateCalendar(month, year) {
            const calendarDates = document.getElementById('calendar-dates');
            if (!calendarDates) return;
            
            calendarDates.innerHTML = '';
            
            // Update month display
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            
            if (document.getElementById('calendar-month')) {
                document.getElementById('calendar-month').textContent = `${monthNames[month]} ${year}`;
            }
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                calendarDates.appendChild(dayElement);
            });
            
            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Get days from previous month
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Add empty cells for days before the first day of the month (previous month)
            for (let i = firstDay - 1; i >= 0; i--) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'calendar-date other-month';
                emptyCell.textContent = daysInPrevMonth - i;
                calendarDates.appendChild(emptyCell);
            }
            
            // Add dates for the current month
            const today = new Date();
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement('div');
                dateElement.className = 'calendar-date';
                dateElement.textContent = i;
                dateElement.dataset.date = `${year}-${month + 1}-${i}`;
                
                // Mark today
                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dateElement.classList.add('today');
                }

                // Mark events
                const hasEvent = barangayData.events.some(event => {
                    const eventMonthIndex = monthShortNames.findIndex(m => m.toLowerCase() === event.month.toLowerCase());
                    return parseInt(event.day) === i && eventMonthIndex === month;
                });
                
                if (hasEvent) {
                    dateElement.classList.add('event');
                    dateElement.addEventListener('click', () => showEventDetails(i, month, year));
                }
                
                calendarDates.appendChild(dateElement);
            }
            
            // Add empty cells for next month to complete the grid
            const totalCells = 42; // 6 rows x 7 days
            const cellsUsed = firstDay + daysInMonth;
            const remainingCells = totalCells - cellsUsed;
            
            for (let i = 1; i <= remainingCells; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'calendar-date other-month';
                emptyCell.textContent = i;
                calendarDates.appendChild(emptyCell);
            }
        }

        // Show event details in modal
        function showEventDetails(day, month, year) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            
            // Find ALL events for this date
            const eventsForDate = barangayData.events.filter(event => {
                const eventMonthIndex = monthShortNames.findIndex(m => m.toLowerCase() === event.month.toLowerCase());
                return parseInt(event.day) === day && eventMonthIndex === month;
            });
            
            if (eventsForDate.length > 0) {
                const modalBody = document.getElementById('modal-body');
                
                // If multiple events on same day
                if (eventsForDate.length > 1) {
                    modalBody.innerHTML = `
                        <div class="modal-event-date">
                            <i class="far fa-calendar-alt"></i>
                            <span>${monthNames[month]} ${day}, ${year}</span>
                            <span style="margin-left: auto; font-size: 0.9rem; color: var(--gray);">
                                ${eventsForDate.length} events
                            </span>
                        </div>
                        <h3 class="modal-event-title">Events on ${monthNames[month]} ${day}</h3>
                    `;
                    
                    eventsForDate.forEach((event, index) => {
                        modalBody.innerHTML += `
                            <div style="margin-bottom: 20px; padding: 15px; background: var(--gray-light); border-radius: 10px;">
                                <h4 style="margin-bottom: 10px; color: var(--primary);">${event.title}</h4>
                                <p style="margin-bottom: 10px; color: var(--gray);">${event.description}</p>
                                <div style="display: flex; flex-direction: column; gap: 5px;">
                                    <div class="modal-event-detail">
                                        <i class="far fa-clock"></i>
                                        <span>${event.time}</span>
                                    </div>
                                    <div class="modal-event-detail">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>${event.location}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    // Single event
                    const event = eventsForDate[0];
                    modalBody.innerHTML = `
                        <div class="modal-event-date">
                            <i class="far fa-calendar-alt"></i>
                            <span>${monthNames[month]} ${day}, ${year}</span>
                        </div>
                        <h3 class="modal-event-title">${event.title}</h3>
                        <p class="modal-event-description">${event.description}</p>
                        <div class="modal-event-details">
                            <div class="modal-event-detail">
                                <i class="far fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="modal-event-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                    `;
                }
                
                document.getElementById('event-modal').style.display = 'flex';
            }
        }

        // News Modal Functions
        function showNewsModal(newsId) {
            const newsItem = barangayData.news.find(item => item.id === newsId);
            if (newsItem) {
                document.getElementById('news-modal-title').textContent = newsItem.title;
                document.getElementById('news-modal-date').innerHTML = `<i class="far fa-calendar"></i> ${newsItem.date}`;
                document.getElementById('news-modal-category').textContent = newsItem.category;
                document.getElementById('news-modal-image').src = newsItem.image;
                document.getElementById('news-modal-image').alt = newsItem.title;
                document.getElementById('news-modal-body').innerHTML = `
                    <p>${newsItem.content}</p>
                `;
                document.getElementById('news-modal').style.display = 'flex';
            }
        }

        function closeNewsModal() {
            document.getElementById('news-modal').style.display = 'none';
        }

        // Set up news event listeners
        function setupNewsEventListeners() {
            // Read more buttons
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('featured-read-more') || 
                    e.target.classList.contains('news-item-read-more') ||
                    e.target.parentElement.classList.contains('featured-read-more') ||
                    e.target.parentElement.classList.contains('news-item-read-more')) {
                    e.preventDefault();
                    const newsId = parseInt(e.target.getAttribute('data-news-id') || 
                                  e.target.parentElement.getAttribute('data-news-id'));
                    showNewsModal(newsId);
                }
                
                // News items click
                if (e.target.closest('.news-item')) {
                    e.preventDefault();
                    const newsItem = e.target.closest('.news-item');
                    const newsId = parseInt(newsItem.getAttribute('data-news-id'));
                    showNewsModal(newsId);
                }
            });
            
            // Modal close buttons
            const newsModalClose = document.getElementById('news-modal-close');
            if (newsModalClose) {
                newsModalClose.addEventListener('click', closeNewsModal);
            }
            
            const newsModalCloseBtn = document.getElementById('news-modal-close-btn');
            if (newsModalCloseBtn) {
                newsModalCloseBtn.addEventListener('click', closeNewsModal);
            }
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === document.getElementById('news-modal')) {
                    closeNewsModal();
                }
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Calendar navigation
            const prevMonthBtn = document.getElementById('prev-month');
            if (prevMonthBtn) {
                prevMonthBtn.addEventListener('click', () => {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    generateCalendar(currentMonth, currentYear);
                });
            }
            
            const nextMonthBtn = document.getElementById('next-month');
            if (nextMonthBtn) {
                nextMonthBtn.addEventListener('click', () => {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                    generateCalendar(currentMonth, currentYear);
                });
            }
            
            // Modal close button
            const closeModalBtn = document.getElementById('close-modal');
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', () => {
                    document.getElementById('event-modal').style.display = 'none';
                });
            }
            
            // Close modal button in footer
            const closeModalFooterBtn = document.getElementById('close-modal-btn');
            if (closeModalFooterBtn) {
                closeModalFooterBtn.addEventListener('click', () => {
                    document.getElementById('event-modal').style.display = 'none';
                });
            }
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === document.getElementById('event-modal')) {
                    document.getElementById('event-modal').style.display = 'none';
                }
            });
        }

        // Admin Functions - WITH MANUAL SAVE TO LOCALSTORAGE
        function updateSystemName(newName) {
            barangayData.systemName = newName;
            saveData();
            updateUI();
        }

        function updateHeroSection(title, description) {
            barangayData.hero.title = title;
            barangayData.hero.description = description;
            saveData();
            updateUI();
        }

        function updateWelcomeSection(backgroundImage, title, subtitle, logo) {
            barangayData.welcomeSection.backgroundImage = backgroundImage;
            barangayData.welcomeSection.title = title;
            barangayData.welcomeSection.subtitle = subtitle;
            barangayData.welcomeSection.logo = logo;
            saveData();
            updateUI();
        }

        function updateNewsSection(title, subtitle) {
            barangayData.sectionTitles.news = title;
            barangayData.newsSection.subtitle = subtitle;
            saveData();
            updateUI();
        }

        function updateNews(newNews) {
            barangayData.news = newNews;
            saveData();
            updateUI();
        }

        function updateEvents(newEvents) {
            barangayData.events = newEvents;
            saveData();
            updateUI();
            generateCalendar(currentMonth, currentYear);
        }

        function updateEmergencyContacts(newContacts) {
            barangayData.emergencyContacts = newContacts;
            saveData();
            updateUI();
        }

        function updateFooter(newFooter) {
            barangayData.footer = newFooter;
            saveData();
            updateUI();
        }

        function updateSectionTitles(newTitles) {
            barangayData.sectionTitles = newTitles;
            saveData();
            updateUI();
        }

        // Export admin functions
        window.barangayAdmin = {
            updateSystemName,
            updateHeroSection,
            updateWelcomeSection,
            updateNewsSection,
            updateNews,
            updateEvents,
            updateEmergencyContacts,
            updateFooter,
            updateSectionTitles,
            getData: () => barangayData,
            saveData,
            loadData
        };

        // Enhanced Manual Save Function
function manualSave() {
    const success = saveData();
    if (success) {
        showNotification('Changes saved successfully!', 'success');
    } else {
        showNotification('Error saving changes', 'error');
    }
}

// Reset to Default Data
function resetToDefault() {
    if (confirm('Are you sure you want to reset to default data?')) {
        const defaultData = {
            systemName: "BARANGAY 118 ONLINE SYSTEM",
            hero: {
                title: "Barangay 118 Online Management System",
                description: "Empowering our community through smart and efficient digital services."
            },
            welcomeSection: {
                backgroundImage: "/Users/nuel/Desktop/Capstone2/received_32392388620408695_edit_2410797689912.png",
                title: "Welcome to Barangay 118",
                subtitle: "A Community of Unity and Progress",
                logo: "308673009_177778618128931_642779678020875763_n.png"
            },
            newsSection: {
                title: "Latest Stories",
                subtitle: "Stay updated with the latest news and announcements from Barangay 118"
            },
            news: [
                {
                    id: 1,
                    title: "Aresto sa Barangay 118: Most Wanted ng Caloocan (2025)",
                    excerpt: "Matapos tumanggap ng tip, inaresto ang pinakawalang-pugad na wanted na si 'Lembot' sa 3rd Avenue, Barangay 118 noong Agosto 12, 2025.",
                    content: "May umiiral na warrant ang suspek kaugnay sa paglabag sa RA 10591 (gun ban law). Itinakda ang piyansang ₱120,000 matapos makulong sa Caloocan City Medical Center. 'In the early hours of August 12, 2025, operatives from the Warrant and Subpoena Section of the Caloocan City Police Station… successfully apprehended 'Lembot,' a 23-year-old male, along 3rd Avenue, Barangay 118, Caloocan City,' ayon sa opisyal na pahayag ng NCRPO.",
                    date: "Agosto 12, 2025",
                    image: "https://npd.ncrpo.pnp.gov.ph/wp-content/uploads/2025/08/532236322_122468457086001348_9156546625737320436_n.jpg",
                    category: "Pulisya",
                    readTime: "4 min",
                    isFeatured: true
                },
                {
                    id: 2,
                    title: "Japan nagtayo ng bagong gusali para sa Grace Park Health Center sa Caloocan (2025)",
                    excerpt: "Nagkaloob ang Embahada ng Japan ng humigit-kumulang PHP 6 milyon upang maitayo ang bagong Grace Park Health Center sa Caloocan City.",
                    content: "Noong Marso 10, 2025, dinaluhan ng Embassy of Japan Second Secretary MATSUSHIGE Tomoaki ang turnover ceremony para sa 'Project for the Construction of the Grace Park Health Center in Caloocan City.' Naglaan ang Japan ng USD 120,477 (≈ PHP 6 milyon) sa ilalim ng Official Development Assistance – Grant Assistance for Grass-roots Human Security Projects (GGP). Ang bagong gusaling pangkalusugan ay papalit sa lumang pasilidad na matagal nang sira at binabaha, upang matiyak ang mas ligtas, malinis, at modernong serbisyong medikal para sa humigit-kumulang 9,600 pasyente kada taon.",
                    date: "Marso 10, 2025",
                    image: "https://www.ph.emb-japan.go.jp/files/100808323.jpg",
                    category: "Komunidad",
                    readTime: "5 min",
                    isFeatured: false
                },
                {
                    id: 3,
                    title: "Sunog sa Caloocan City: 1 PWD patay, 50 pamilya nawalan",
                    excerpt: "Isang taong may kapansanan ang nasawi nang sumiklab ang malaking sunog sa Barangay 118, Grace Park, Caloocan nitong Disyembre 2024.",
                    content: "Ayon sa Caloocan BFP, nagsimula ang apoy bandang 2:56 ng madaling-araw sa 4th Avenue, at mabilis na lumaganap dahil magkakatabi ang mga bahay. 'A PWD died in a fire which razed about 20 houses in Caloocan City…' ayon sa ulat ng GMA News.",
                    date: "Disyembre 2024",
                    image: "https://images.gmanews.tv/webpics/2024/12/caloocan_fire_12-29-24_2024_12_29_18_34_08.jpg",
                    category: "Sunog",
                    readTime: "3 min",
                    isFeatured: false
                },
                {
                    id: 4,
                    title: "Bagong Barangay Health Center sa Brgy. 118-120, Caloocan",
                    excerpt: "Ipinamahagi ang bagong ayos at pinalakas na Barangay Health Center ng Grace Park (Brgy. 118-120) sa Caloocan City ilang araw bago sumapit ang 2024.",
                    content: "Itinataguyod ng SM Foundation at mga katuwang nito ang pagbabagong ito para gawing mas komportableng klinika ang pasilidad. 'A few days before New Year's Day, SM Foundation turned over…' ayon sa Market Monitor.",
                    date: "January 16, 2024",
                    image: "https://i0.wp.com/marketmonitor.com.ph/wp-content/uploads/2024/01/SMFI-image2.jpg?resize=618%2C927&ssl=1",
                    category: "Kalusugan",
                    readTime: "4 min",
                    isFeatured: false
                }
            ],
            events: [
                { day: "11", month: "Nov", title: "Barangay 118 General Assembly", description: "Monthly gathering for all residents to discuss community matters and updates.", time: "8:00 AM - 12:00 PM", location: "Barangay 118 Hall Covered Court" },
                { day: "15", month: "Nov", title: "Health and Wellness Seminar", description: "Free health check-ups and informative talks on community health.", time: "1:00 PM - 4:00 PM", location: "Barangay 118 Health Center" },
                { day: "24", month: "Nov", title: "Community Clean-up Drive", description: "Monthly community clean-up activity. All residents are welcome to join.", time: "6:00 AM - 9:00 AM", location: "Meet at Barangay 118 Plaza" }
            ],
emergencyContacts: [
    { icon: '<i class="fa-solid fa-truck-medical emergency-icon"></i>', title: "Emergency Medical Services", description: "For medical emergencies and ambulance", number: "911" },
    { icon: '<i class="fa-solid fa-fire emergency-icon"></i>', title: "Fire Department", description: "For fire emergencies and rescue", number: "(02) 8426-0219" },
    { icon: '<i class="fa-solid fa-user-shield emergency-icon"></i>', title: "Police Department", description: "For crime reporting and emergencies", number: "117" },
    { icon: '<i class="fa-solid fa-phone emergency-icon"></i>', title: "Barangay 118 Hotline", description: "For barangay-related concerns", number: "(02) 8123-4567" }
],

            footer: {
                title: "Barangay 118 Online System",
                description: "Digital and efficient services for Barangay 118.",
                contactInfo: [
                    "Barangay 118 Hall, City Proper",
                    "Metro Manila, Philippines",
                    "(02) 8123-4567",
                    "info@barangay118.gov.ph",
                    "Mon-Fri: 8:00 AM - 5:00 PM"
                ],
                socialMedia: {
                    facebook: "https://www.facebook.com",
                    email: "mailto:barangay118@gmail.com"
                },
                copyright: "&copy; 2025 Barangay 118 Online System. All Rights Reserved."
            },
            sectionTitles: {
                news: "Latest Stories",
                events: "Barangay 118 Community Events Calendar",
                upcomingEvents: "Upcoming Events",
                emergency: "Barangay 118 Emergency Contacts"
            }
        };
        
        Object.keys(defaultData).forEach(key => {
            barangayData[key] = defaultData[key];
        });
        
        saveData();
        updateUI();
        showNotification('Reset to default data successful!', 'success');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.getElementById('custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 8px; color: white; font-weight: 600; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 10px; max-width: 400px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Set background color based on type
    const notificationDiv = notification.querySelector('div');
    if (type === 'success') {
        notificationDiv.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notificationDiv.style.backgroundColor = '#ef4444';
    } else {
        notificationDiv.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Enhanced Admin Functions with Manual Save
window.barangayAdmin = {
    updateSystemName: function(newName) {
        barangayData.systemName = newName;
        manualSave();
        updateUI();
    },
    updateHeroSection: function(title, description) {
        barangayData.hero.title = title;
        barangayData.hero.description = description;
        manualSave();
        updateUI();
    },
    updateWelcomeSection: function(backgroundImage, title, subtitle, logo) {
        barangayData.welcomeSection.backgroundImage = backgroundImage;
        barangayData.welcomeSection.title = title;
        barangayData.welcomeSection.subtitle = subtitle;
        barangayData.welcomeSection.logo = logo;
        manualSave();
        updateUI();
    },
    updateNewsSection: function(title, subtitle) {
        barangayData.sectionTitles.news = title;
        barangayData.newsSection.subtitle = subtitle;
        manualSave();
        updateUI();
    },
    updateNews: function(newNews) {
        barangayData.news = newNews;
        manualSave();
        updateUI();
    },
    updateEvents: function(newEvents) {
        barangayData.events = newEvents;
        manualSave();
        updateUI();
        generateCalendar(currentMonth, currentYear);
    },
    updateEmergencyContacts: function(newContacts) {
        barangayData.emergencyContacts = newContacts;
        manualSave();
        updateUI();
    },
    updateFooter: function(newFooter) {
        barangayData.footer = newFooter;
        manualSave();
        updateUI();
    },
    updateSectionTitles: function(newTitles) {
        barangayData.sectionTitles = newTitles;
        manualSave();
        updateUI();
    },
    getData: () => barangayData,
    saveData: manualSave,
    loadData: loadData,
    manualSave: manualSave,
    resetToDefault: resetToDefault
};

iconContainer.innerHTML = contact.icon;

console.log(' Barangay Admin System Connected - Ready for Admin Panel Integration');