// Check if user exists in local storage
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        showJournalInterface(userName);
    }
    
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
    
    loadEntries();
});

function setupUser() {
    const userName = document.getElementById('userName').value.trim();
    if (userName) {
        localStorage.setItem('userName', userName);
        showJournalInterface(userName);
    } else {
        alert('Please enter your name');
    }
}

function showJournalInterface(userName) {
    document.getElementById('userSetup').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('welcomeMessage').textContent = `Welcome back, ${userName}!`;
    document.getElementById('newEntry').classList.remove('hidden');  // Fix: Show journal entry form
}

function saveEntry() {
    const date = document.getElementById('entryDate').value;
    const content = document.getElementById('entryContent').value;
    const imageFile = document.getElementById('entryImage').files[0];

    if (!content) {
        alert('Please write something in your entry');
        return;
    }

    const saveEntryToStorage = (imageDataUrl = null) => {
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        entries.unshift({
            date,
            content,
            image: imageDataUrl,
            timestamp: new Date().getTime()
        });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        loadEntries();
        document.getElementById('entryContent').value = '';
        document.getElementById('entryImage').value = '';
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            saveEntryToStorage(e.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveEntryToStorage();
    }
}
